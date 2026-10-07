import { Spinner, Inline, Text } from "executive-ui";

export const Sizes = () => (
  <Inline gap={5} align="center">
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </Inline>
);

export const WithText = () => (
  <Inline gap={2}>
    <Spinner size="sm" label="" />
    <Text variant="meta">Fetching latest figures</Text>
  </Inline>
);
