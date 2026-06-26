import type { FeedSettings } from '@/lib/types';
import { space } from '@/lib/theme';
import { useT } from '../../i18n';
import type { PanelProps } from './types';
import { Text } from '../../atoms/Text';
import { Grid2 } from '../../atoms/layout';
import { Toggle } from '../../molecules/Toggle';

const GROUPS: { title: string; keys: (keyof FeedSettings)[] }[] = [
  { title: 'feed.groupHide', keys: ['hideShorts', 'hideWatched', 'hideLive', 'hideMixes', 'hideRadios', 'hideNews', 'hideDiscover'] },
  { title: 'feed.groupSidebar', keys: ['hideSubscriptions'] },
  { title: 'feed.groupShorts', keys: ['convertShorts', 'fixShortsLoad'] },
  { title: 'feed.groupView', keys: ['compactGrid'] },
];

export function FeedPanel({ s, save }: PanelProps) {
  const t = useT();
  const toggleFeed = (key: keyof FeedSettings) => save({ ...s, feed: { ...s.feed, [key]: !s.feed[key] } });
  return (
    <>
      <Text role="title">{t('feed.title')}</Text>
      {GROUPS.map((g) => (
        <div key={g.title}>
          <Text role="sub">{t(g.title)}</Text>
          <div style={{ marginTop: space[4] }}>
            <Grid2>
              {g.keys.map((key) => (
                <Toggle
                  key={key}
                  label={t(`feed.${key}.label`)}
                  hint={t(`feed.${key}.hint`)}
                  on={s.feed[key]}
                  onChange={() => toggleFeed(key)}
                />
              ))}
            </Grid2>
          </div>
        </div>
      ))}
    </>
  );
}
