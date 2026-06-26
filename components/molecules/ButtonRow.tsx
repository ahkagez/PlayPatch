import type { ComponentChildren } from 'preact';
import { space } from '@/lib/theme';
import { Row } from '../atoms/layout';

export function ButtonRow({ children }: { children: ComponentChildren }) {
  return (
    <Row gap={space[4]} wrap style={{ marginTop: space[5] }}>
      {children}
    </Row>
  );
}
