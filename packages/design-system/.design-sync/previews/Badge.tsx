import { Badge, Icon, Inline } from "executive-ui";

export const Tones = () => (
  <Inline gap={2}>
    <Badge>Neutral</Badge>
    <Badge tone="info">Info</Badge>
    <Badge tone="success">Success</Badge>
    <Badge tone="warning">Warning</Badge>
    <Badge tone="danger">Danger</Badge>
  </Inline>
);

export const Variants = () => (
  <Inline gap={2}>
    <Badge variant="subtle" tone="info">Subtle</Badge>
    <Badge variant="outline" tone="info">Outline</Badge>
    <Badge variant="solid" tone="info">Solid</Badge>
    <Badge variant="solid">Solid neutral</Badge>
    <Badge tone="success" icon={<Icon name="check" />}>Approved</Badge>
    <Badge size="sm" tone="warning" variant="outline">Illustrative</Badge>
  </Inline>
);
