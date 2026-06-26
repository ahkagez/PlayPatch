import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { clamp } from '@/lib/util';

const MIN_BOOST = 1;
const MAX_BOOST = 5;
const MIN_SPEED = 0.25;
const MAX_SPEED = 4;

interface AudioGraph {
  source: MediaElementAudioSourceNode;
  gain: GainNode;
}

interface MoviePlayer extends HTMLElement {
  getAvailableQualityLevels?: () => string[];
  getPlaybackQuality?: () => string;
  setPlaybackQualityRange?: (min: string, max: string) => void;
}

export class PlayerFeature implements YouTubeFeature {
  readonly id = 'player';

  private ctx: AudioContext | null = null;
  private graphs = new WeakMap<HTMLMediaElement, AudioGraph>();
  private live = new Set<AudioGraph>();
  private videoHooked = new WeakSet<HTMLVideoElement>();

  private settings: Settings | null = null;
  private lastVideoId = '';
  private lastSpeed = -1;
  private qualityKey = '';

  constructor(private readonly onPersist: (s: Settings) => void) {}

  apply(settings: Settings): void {
    this.settings = settings;
    const p = settings.player;
    const video = document.querySelector<HTMLVideoElement>('video.html5-main-video, video');
    if (!video) return;

    this.applyVolume(video, clamp(p.volumeBoost, MIN_BOOST, MAX_BOOST));

    const videoId = new URLSearchParams(location.search).get('v') ?? location.pathname;
    const newVideo = videoId !== this.lastVideoId;
    this.lastVideoId = videoId;

    this.hookVideo(video);
    const desired = clamp(p.speed, MIN_SPEED, MAX_SPEED);
    const speedChanged = desired !== this.lastSpeed;
    this.lastSpeed = desired;
    if (newVideo || speedChanged) this.assertSpeed(video, desired);

    this.applyQuality(videoId, p.defaultQuality);
    this.injectPipButton();
  }

  clear(): void {
    this.live.forEach((g) => (g.gain.gain.value = 1));
    this.removePipButton();
    this.lastSpeed = -1;
    this.qualityKey = '';
  }

  dispose(): void {
    this.live.forEach((g) => (g.gain.gain.value = 1));
    this.removePipButton();
    void this.ctx?.close();
    this.ctx = null;
    this.live.clear();
  }

  private applyVolume(video: HTMLVideoElement, boost: number): void {
    let graph = this.graphs.get(video);
    if (!graph) {
      if (boost <= 1) return;
      graph = this.wrap(video) ?? undefined;
      if (!graph) return;
    }
    graph.gain.gain.value = boost;
    void this.ctx?.resume();
  }

  private wrap(video: HTMLVideoElement): AudioGraph | null {
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx ??= new Ctor();
      void this.ctx.resume();
      const source = this.ctx.createMediaElementSource(video);
      const gain = this.ctx.createGain();
      source.connect(gain).connect(this.ctx.destination);
      const graph: AudioGraph = { source, gain };
      this.graphs.set(video, graph);
      this.live.add(graph);
      return graph;
    } catch {
      return null;
    }
  }

  private hookVideo(video: HTMLVideoElement): void {
    if (this.videoHooked.has(video)) return;
    this.videoHooked.add(video);
    video.addEventListener('loadeddata', () => this.assertSpeed(video));
    video.addEventListener('ratechange', () => this.rememberRate(video));
  }

  private assertSpeed(video: HTMLVideoElement, desired?: number): void {
    if (!this.settings) return;
    const speed = desired ?? clamp(this.settings.player.speed, MIN_SPEED, MAX_SPEED);
    if (Math.abs(video.playbackRate - speed) > 0.001) video.playbackRate = speed;
  }

  private rememberRate(video: HTMLVideoElement): void {
    if (!this.settings?.player.rememberSpeed) return;
    const next = clamp(video.playbackRate, MIN_SPEED, MAX_SPEED);
    if (Math.abs(next - this.settings.player.speed) <= 0.01) return;
    this.onPersist({ ...this.settings, player: { ...this.settings.player, speed: next } });
  }

  private applyQuality(videoId: string, quality: string): void {
    if (quality === 'auto') return;
    const key = `${videoId}|${quality}`;
    if (key === this.qualityKey) return;
    const player = document.querySelector<MoviePlayer>('#movie_player');
    const levels = player?.getAvailableQualityLevels?.();
    if (!levels || !player?.setPlaybackQualityRange) return;
    this.qualityKey = key;
    if (levels.includes(quality) && player.getPlaybackQuality?.() !== quality) {
      player.setPlaybackQualityRange(quality, quality);
    }
  }

  private injectPipButton(): void {
    if (!document.pictureInPictureEnabled) return;
    const sizeBtn =
      document.querySelector<HTMLElement>('#movie_player .ytp-right-controls .ytp-size-button') ??
      document.querySelector<HTMLElement>('.ytp-right-controls .ytp-size-button');
    const bar = sizeBtn?.parentElement;
    if (!sizeBtn || !bar || bar.querySelector('.foco-pip-button')) return;
    const btn = document.createElement('button');
    btn.className = 'ytp-button foco-pip-button';
    btn.title = 'Picture-in-picture (mini reproductor)';
    btn.setAttribute('aria-label', 'Picture-in-picture');
    btn.appendChild(pipIcon());
    btn.addEventListener('click', this.togglePip);
    try {
      bar.insertBefore(btn, sizeBtn);
    } catch {}
  }

  private removePipButton(): void {
    document.querySelector('.foco-pip-button')?.remove();
  }

  private togglePip = async (): Promise<void> => {
    const video = document.querySelector<HTMLVideoElement>('video.html5-main-video, video');
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        video.disablePictureInPicture = false;
        await video.requestPictureInPicture();
      }
    } catch {}
  };
}

function pipIcon(): SVGSVGElement {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('height', '24');
  svg.setAttribute('width', '24');
  svg.setAttribute('viewBox', '0 0 24 24');
  const frame = document.createElementNS(NS, 'path');
  frame.setAttribute('fill', '#fff');
  frame.setAttribute('fill-rule', 'evenodd');
  frame.setAttribute('d', 'M1 3h22v18H1z M3 5h18v14H3z');
  const mini = document.createElementNS(NS, 'path');
  mini.setAttribute('fill', '#fff');
  mini.setAttribute('d', 'M11 11h8v6h-8z');
  svg.append(frame, mini);
  return svg;
}
