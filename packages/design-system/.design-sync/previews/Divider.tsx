import { Divider, Text, Stack, Inline, Button } from "executive-ui";

export const Horizontal = () => (
  <Stack gap={0} style={{ maxWidth: "24rem" }}>
    <Text weight="medium">Recommendation: consolidate by Q3</Text>
    <Divider spacing="md" />
    <Text variant="compact" tone="secondary">Supporting analysis follows in three parts.</Text>
  </Stack>
);

export const Labeled = () => (
  <Stack gap={0} style={{ maxWidth: "20rem" }}>
    <Button variant="secondary" fullWidth>Continue with single sign-on</Button>
    <Divider label="or" spacing="md" />
    <Button variant="secondary" fullWidth>Continue with email</Button>
  </Stack>
);

export const Vertical = () => (
  <Inline gap={2}>
    <Text variant="meta">Prepared by Finance</Text>
    <Divider orientation="vertical" />
    <Text variant="meta">Updated 3 days ago</Text>
    <Divider orientation="vertical" />
    <Text variant="meta">Version 2</Text>
  </Inline>
);
