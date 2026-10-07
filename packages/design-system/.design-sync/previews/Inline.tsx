import { Inline, Button, Badge, Text } from "executive-ui";

export const Actions = () => (
  <Inline gap={2}>
    <Button variant="primary">Approve</Button>
    <Button variant="secondary">Request changes</Button>
    <Button variant="ghost">Cancel</Button>
  </Inline>
);

export const SpaceBetween = () => (
  <Inline justify="between" style={{ width: "100%" }}>
    <Inline gap={2}><Text weight="medium">Vendor consolidation brief</Text><Badge tone="neutral">Draft</Badge></Inline>
    <Button size="sm">Edit</Button>
  </Inline>
);
