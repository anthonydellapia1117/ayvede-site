import { Inline, Button, Badge } from "executive-ui";

export const Actions = () => (
  <Inline gap={2}>
    <Button variant="primary">Approve</Button>
    <Button variant="secondary">Request changes</Button>
    <Button variant="ghost">Cancel</Button>
  </Inline>
);

export const SpaceBetween = () => (
  <Inline justify="between" style={{ width: "100%" }}>
    <Badge tone="info">Draft</Badge>
    <Button size="sm">Edit</Button>
  </Inline>
);
