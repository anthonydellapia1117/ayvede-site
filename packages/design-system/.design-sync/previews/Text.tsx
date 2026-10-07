import { Text, Stack } from "executive-ui";

export const Variants = () => (
  <Stack gap={3} style={{ maxWidth: "40rem" }}>
    <Text variant="lead">Lead: the framing sentence a busy reader sees first.</Text>
    <Text>Body at 16px with a 1.6 line height. Keep paragraphs short and lead with the conclusion.</Text>
    <Text variant="compact">Compact at 14px for dense interface copy and table cells.</Text>
    <Text variant="meta">Meta at 13px for timestamps, sources, and secondary labels.</Text>
    <Text variant="eyebrow">Eyebrow label</Text>
  </Stack>
);

export const Tones = () => (
  <Stack gap={2}>
    <Text tone="primary">Primary text</Text>
    <Text tone="secondary">Secondary text</Text>
    <Text tone="tertiary">Tertiary text</Text>
    <Text tone="success">Success text</Text>
    <Text tone="warning">Warning text</Text>
    <Text tone="danger">Danger text</Text>
  </Stack>
);

export const NumericAndMono = () => (
  <Stack gap={2}>
    <Text numeric>Tabular figures: 1,284.50 and 39.00 align in columns.</Text>
    <Text mono>REQ-2024-00187</Text>
    <Text truncate style={{ maxWidth: "16rem" }}>A long title that is truncated with an ellipsis when it runs out of room</Text>
  </Stack>
);
