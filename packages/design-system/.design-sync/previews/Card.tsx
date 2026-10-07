import { Card, Text, Badge, Link, Stack } from "executive-ui";

export const WithHeaderAndFooter = () => (
  <Card title="What changes for teams" description="Day-to-day impact" action={<Badge tone="info">Draft</Badge>} footer={<Link href="#" standalone>Read the change plan</Link>} style={{ maxWidth: "24rem" }}>
    <Text variant="compact">One login, one intake form, and approvals inside the platform instead of email threads.</Text>
  </Card>
);

export const Tones = () => (
  <Stack gap={3} style={{ maxWidth: "24rem" }}>
    <Card title="Recommended option" tone="surface"><Text variant="compact">Consolidate on the incumbent suite and retire two tools by Q2.</Text></Card>
    <Card title="Background" tone="subtle"><Text variant="compact">How three tools came to cover the same workflow, for readers new to the program.</Text></Card>
    <Card title="Bottom line" tone="inverse"><Text variant="compact">Approve option B to save about $410,000 a year (illustrative).</Text></Card>
  </Stack>
);

export const Padding = () => (
  <Stack gap={3} style={{ maxWidth: "24rem" }}>
    <Card padding="sm" title="Open actions"><Text variant="compact">Four owners, two due this week.</Text></Card>
    <Card padding="md" title="Budget ask"><Text variant="compact">$180,000 for a 6-week discovery (illustrative).</Text></Card>
    <Card padding="lg" title="Recommendation"><Text variant="compact">Consolidate on the incumbent suite and retire two tools by Q2.</Text></Card>
  </Stack>
);

export const Interactive = () => (
  <Card as="a" href="#" interactive title="Open the vendor comparison" description="Three options, one recommendation" style={{ maxWidth: "20rem" }} footer={<Text as="span" variant="meta">Updated 2 October</Text>}>
    <Text variant="compact">Option B saves the most and keeps the incumbent&apos;s audit trail.</Text>
  </Card>
);
