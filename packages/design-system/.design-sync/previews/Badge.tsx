import { Badge, Icon, Inline } from "executive-ui";

export const Tones = () => (
  <Inline gap={2}>
    <Badge>Draft</Badge>
    <Badge tone="info">In review</Badge>
    <Badge tone="success">Approved</Badge>
    <Badge tone="warning">At risk</Badge>
    <Badge tone="danger">Overdue</Badge>
  </Inline>
);

export const Variants = () => (
  <Inline gap={2}>
    <Badge variant="subtle" tone="info">In review</Badge>
    <Badge variant="outline" tone="info">In review</Badge>
    <Badge variant="solid">Recommended</Badge>
    <Badge tone="success" icon={<Icon name="check" />}>Approved</Badge>
    <Badge size="sm" tone="warning" variant="outline">Illustrative</Badge>
  </Inline>
);
