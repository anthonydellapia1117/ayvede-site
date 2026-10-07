import { Divider, Text, Stack, Inline } from "executive-ui";

export const Horizontal = () => (
  <Stack gap={0} style={{ maxWidth: "24rem" }}>
    <Text>Above the rule</Text>
    <Divider spacing="md" />
    <Text>Below the rule</Text>
  </Stack>
);

export const Labeled = () => (
  <div style={{ maxWidth: "24rem" }}>
    <Divider label="or" spacing="sm" />
  </div>
);

export const Vertical = () => (
  <Inline gap={3}>
    <Text>Owner</Text>
    <Divider orientation="vertical" />
    <Text>Updated 3 days ago</Text>
  </Inline>
);
