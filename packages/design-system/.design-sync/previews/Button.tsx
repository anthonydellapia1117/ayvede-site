import { Button, Icon, Inline } from "executive-ui";

export const Variants = () => (
  <Inline>
    <Button variant="primary">Approve</Button>
    <Button variant="secondary">Request changes</Button>
    <Button variant="contrast">Export brief</Button>
    <Button variant="ghost">Cancel</Button>
    <Button variant="danger">Withdraw request</Button>
  </Inline>
);

export const Sizes = () => (
  <Inline align="center">
    <Button variant="primary" size="sm">Approve</Button>
    <Button variant="primary" size="md">Approve</Button>
    <Button variant="primary" size="lg">Approve</Button>
  </Inline>
);

export const WithIcons = () => (
  <Inline>
    <Button variant="primary" iconStart={<Icon name="plus" />}>New request</Button>
    <Button variant="secondary" iconEnd={<Icon name="arrowRight" />}>Continue</Button>
    <Button variant="secondary" iconStart={<Icon name="document" />}>Download brief</Button>
  </Inline>
);

export const States = () => (
  <Inline>
    <Button variant="primary" loading>Saving</Button>
    <Button variant="secondary" loading>Saving</Button>
    <Button variant="primary" disabled>Approve</Button>
    <Button variant="ghost" disabled>Skip</Button>
    <Button variant="primary" href="#">Open the brief</Button>
  </Inline>
);

export const FullWidth = () => (
  <div style={{ width: "20rem" }}>
    <Button variant="primary" fullWidth>Approve the pilot rollout</Button>
  </div>
);
