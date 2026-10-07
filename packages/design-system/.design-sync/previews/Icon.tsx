import { Icon, iconNames, Inline, Stack, Text } from "executive-ui";

export const AllGlyphs = () => (
  <Inline gap={4}>
    {iconNames.map((n) => (
      <Stack key={n} gap={1} align="center" style={{ width: "5.5rem" }}>
        <Icon name={n} size="lg" />
        <Text variant="meta" mono>{n}</Text>
      </Stack>
    ))}
  </Inline>
);

export const SizesAndTones = () => (
  <Inline gap={4}>
    <Icon name="checkCircle" size="sm" tone="success" />
    <Icon name="checkCircle" size="md" tone="success" />
    <Icon name="checkCircle" size="lg" tone="success" />
    <Icon name="warning" size="lg" tone="warning" />
    <Icon name="xCircle" size="lg" tone="danger" />
    <Icon name="info" size="lg" tone="info" />
  </Inline>
);

export const Labeled = () => <Icon name="external" label="Opens in a new tab" size="lg" />;
