import { Stack, Text, Card } from "executive-ui";

export const Default = () => (
  <Stack gap={4} style={{ maxWidth: "24rem" }}>
    <Card padding="sm"><Text variant="compact">First item</Text></Card>
    <Card padding="sm"><Text variant="compact">Second item</Text></Card>
    <Card padding="sm"><Text variant="compact">Third item</Text></Card>
  </Stack>
);

export const WithDividers = () => (
  <Stack gap={3} divider style={{ maxWidth: "24rem" }}>
    <Text>Discovery complete</Text>
    <Text>Pilot in progress</Text>
    <Text>Full migration upcoming</Text>
  </Stack>
);
