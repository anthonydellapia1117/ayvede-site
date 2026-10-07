import { Stack, Text, Card } from "executive-ui";

export const Default = () => (
  <Stack gap={4} style={{ maxWidth: "24rem" }}>
    <Card padding="sm"><Text variant="compact">Situation: three overlapping platforms, $2.4M a year (illustrative)</Text></Card>
    <Card padding="sm"><Text variant="compact">Recommendation: consolidate onto one platform by Q3</Text></Card>
    <Card padding="sm"><Text variant="compact">Next step: approve the pilot budget on 14 November</Text></Card>
  </Stack>
);

export const WithDividers = () => (
  <Stack gap={3} divider style={{ maxWidth: "24rem" }}>
    <Text>Discovery complete</Text>
    <Text>Pilot in progress</Text>
    <Text>Full migration upcoming</Text>
  </Stack>
);
