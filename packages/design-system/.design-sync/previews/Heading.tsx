import { Heading, Stack } from "executive-ui";

export const Scale = () => (
  <Stack gap={4}>
    <Heading level={2} size="display">Display for landing pages</Heading>
    <Heading level={2} size="1">Heading one for page titles</Heading>
    <Heading level={2} size="2">Heading two for sections</Heading>
    <Heading level={3} size="3">Heading three for panels</Heading>
    <Heading level={4} size="4">Heading four for compact groups</Heading>
  </Stack>
);

export const LevelIndependentOfSize = () => (
  <Stack gap={3}>
    <Heading level={1} size="3">An h1 rendered at size 3</Heading>
    <Heading level={3} size="1">An h3 rendered at size 1</Heading>
  </Stack>
);

export const Tones = () => (
  <Stack gap={2}>
    <Heading level={2} size="2">Consolidate on the incumbent suite</Heading>
    <Heading level={3} size="3" tone="secondary">Saves about $410,000 a year (illustrative)</Heading>
  </Stack>
);
