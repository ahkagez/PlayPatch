import { render } from 'preact';
import '@/lib/fonts';
import { SettingsApp } from '@/components/pages/SettingsApp';

render(<SettingsApp />, document.getElementById('app')!);
