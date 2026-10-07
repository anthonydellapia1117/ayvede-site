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
    <Link href="#" tone="subtle">Subtle link</Link>
    <Link href="#" underline="hover">Underline on hover</Link>
  </Stack>
);
