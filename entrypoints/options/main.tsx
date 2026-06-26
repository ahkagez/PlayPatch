import { render } from 'preact';
import '@/lib/fonts';
import { primeThemeFromCache } from '@/lib/theme-cache';
import { SettingsApp } from '@/components/pages/SettingsApp';

primeThemeFromCache();
render(<SettingsApp />, document.getElementById('app')!);
