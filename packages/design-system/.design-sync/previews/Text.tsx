import { Text, Stack, Inline } from "executive-ui";

export const Variants = () => (
  <Stack gap={3} style={{ maxWidth: "40rem" }}>
    <Text variant="eyebrow">Recommendation</Text>
    <Text variant="lead">Consolidate the three intake platforms onto the incumbent suite by the end of Q3.</Text>
    <Text>The incumbent already handles most requests. Moving the remaining teams retires two contracts and one support queue, and the pilot showed no drop in turnaround.</Text>
    <Text variant="compact">Decision needed by 14 November to hold the Q3 date.</Text>
    <Text variant="meta">Source: finance spend extract, FY24 (illustrative).</Text>
  </Stack>
);

export const Tones = () => (
  <Stack gap={2}>
    <Text tone="primary">Recommendation: consolidate onto one platform by Q3.</Text>
    <Text tone="secondary">Prepared by the program office for the steering committee.</Text>
    <Text tone="tertiary">Last updated 2 October.</Text>
    <Text tone="success">Pilot finished two weeks ahead of plan.</Text>
    <Text tone="warning">Two contracts renew within 60 days.</Text>
    <Text tone="danger">Data migration is blocked on a vendor export.</Text>
  </Stack>
);

export const NumericAndMono = () => (
  <Stack gap={4} style={{ maxWidth: "18rem" }}>
    <Stack gap={2}>
      <Text variant="eyebrow">Annual run cost (illustrative)</Text>
      <Stack gap={2} divider>
        <Inline justify="between" wrap={false}><Text variant="compact" tone="secondary">Licences</Text><Text numeric>$1,284,500</Text></Inline>
        <Inline justify="between" wrap={false}><Text variant="compact" tone="secondary">Support</Text><Text numeric>$239,000</Text></Inline>
        <Inline justify="between" wrap={false}><Text variant="compact" tone="secondary">Hosting</Text><Text numeric>$1,107,250</Text></Inline>
        <Inline justify="between" wrap={false}><Text variant="compact" tone="secondary" weight="medium">Total</Text><Text numeric weight="medium">$2,630,750</Text></Inline>
      </Stack>
    </Stack>
    <Text mono>REQ-2024-00187</Text>
  </Stack>
);

export const Truncate = () => (
  <Stack gap={2} style={{ maxWidth: "20rem" }}>
    <Text variant="eyebrow">Open decisions</Text>
    <Text truncate>Consolidate three overlapping intake platforms onto the incumbent suite by Q3</Text>
    <Text truncate>Renew the analytics contract for 24 months at the negotiated rate</Text>
    <Text truncate>Approve the pilot budget</Text>
  </Stack>
);
