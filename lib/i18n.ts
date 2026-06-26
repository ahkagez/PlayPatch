import en from './locales/en';
import es from './locales/es';
import ca from './locales/ca';
import pt from './locales/pt';
import fr from './locales/fr';
import de from './locales/de';
import it from './locales/it';
import nl from './locales/nl';
import ru from './locales/ru';
import pl from './locales/pl';
import tr from './locales/tr';
import ja from './locales/ja';
import ko from './locales/ko';
import zh from './locales/zh';

export type MessageKey = keyof typeof en;
export type Dict = Partial<Record<MessageKey, string>>;

export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ca', label: 'Català' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ru', label: 'Русский' },
  { code: 'pl', label: 'Polski' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];

const MESSAGES: Record<Locale, Dict> = { en, es, ca, pt, fr, de, it, nl, ru, pl, tr, ja, ko, zh };

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && LOCALES.some((l) => l.code === value);
}

export function detectLocale(): Locale {
  const nav = typeof navigator !== 'undefined' ? navigator.language : '';
  const code = (nav || 'en').slice(0, 2).toLowerCase();
  return isLocale(code) ? code : DEFAULT_LOCALE;
}

export function translate(locale: Locale, key: string): string {
  const k = key as MessageKey;
  return MESSAGES[locale]?.[k] ?? en[k] ?? key;
}
