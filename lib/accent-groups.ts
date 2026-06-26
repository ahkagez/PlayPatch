export interface AccentGroup {
  id: string;
  default: boolean;
}

export const ACCENT_GROUPS: readonly AccentGroup[] = [
  { id: 'player', default: true },
  { id: 'menus', default: true },
  { id: 'badges', default: true },
  { id: 'comments', default: true },
  { id: 'liveChat', default: true },
  { id: 'links', default: false },
  { id: 'musicAlbum', default: true },
];
