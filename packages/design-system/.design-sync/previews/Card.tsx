import { Card, Text, Badge, Link, Button, Inline, Grid } from "executive-ui";

export const WithHeaderAndFooter = () => (
  <Card title="What changes for teams" description="Day-to-day impact" action={<Badge tone="info">Draft</Badge>} footer={<Link href="#" standalone>Read the change plan</Link>} style={{ maxWidth: "24rem" }}>
    <Text variant="compact">One login, one intake form, and approvals inside the platform instead of email threads.</Text>
  </Card>
);

export const Tones = () => (
  <Grid columns={3}>
    <Card title="Surface" tone="surface"><Text variant="compact">Default white card.</Text></Card>
    <Card title="Subtle" tone="subtle"><Text variant="compact">Quiet tinted card for secondary material.</Text></Card>
    <Card title="Inverse" tone="inverse"><Text variant="compact">High-contrast card for a bottom line.</Text></Card>
  </Grid>
);

export const Padding = () => (
  <Inline align="stretch">
    <Card padding="sm" title="Small padding"><Text variant="compact">Dense lists.</Text></Card>
    <Card padding="md" title="Medium padding"><Text variant="compact">The default.</Text></Card>
    <Card padding="lg" title="Large padding"><Text variant="compact">Forms and features.</Text></Card>
  </Inline>
);

export const Interactive = () => (
  <Card as="a" href="#" interactive title="Open the vendor comparison" description="Three options, one recommendation" style={{ maxWidth: "20rem" }} footer={<Button size="sm" variant="ghost" tabIndex={-1}>View</Button>}>
    <Text variant="compact">The whole card is the link.</Text>
  </Card>
);
