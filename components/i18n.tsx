import { createContext } from 'preact';
import type { ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';
import { translate, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function I18nProvider({ locale, children }: { locale: Locale; children: ComponentChildren }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useT(): (key: string) => string {
  const locale = useContext(LocaleContext);
  return (key: string) => translate(locale, key);
}
