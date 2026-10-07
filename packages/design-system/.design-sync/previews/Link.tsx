import { Link, Text, Stack } from "executive-ui";

export const InProse = () => (
  <Text style={{ maxWidth: "36rem" }}>
    The figures come from the <Link href="#">finance model v4</Link> and the <Link href="#">architecture inventory</Link>.
  </Text>
);

export const Variants = () => (
  <Stack gap={3}>
    <Link href="#" standalone>Read the change plan</Link>
    <Link href="https://example.org" external>Vendor security standard</Link>
    <Text variant="meta">Source: <Link href="#" tone="subtle">finance model v4</Link> (illustrative)</Text>
    <Link href="#" underline="hover">Program dashboard</Link>
  </Stack>
);
