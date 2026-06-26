import { YT, space, fontSize, fontWeight } from '@/lib/theme';
import { Row } from '../atoms/layout';
import { ColorBall } from '../atoms/ColorBall';
import { Text } from '../atoms/Text';

export function AccentPreview({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <Row gap={space[8]} style={{ padding: '2px 0 20px' }}>
      <ColorBall color={color} />
      <div style={{ minWidth: 0 }}>
        <Text role="body" style={{ display: 'block', fontSize: fontSize.xl, fontWeight: fontWeight.medium }}>
          {name}
        </Text>
        <Text role="mono" style={{ display: 'block', margin: '4px 0 0', color: YT.text2, letterSpacing: 0.5 }}>
          {hex}
        </Text>
      </div>
    </Row>
  );
}
