import { Button, Icon, Inline } from "executive-ui";

export const Variants = () => (
  <Inline>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="contrast">Contrast</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Delete</Button>
  </Inline>
);

export const Sizes = () => (
  <Inline align="center">
    <Button variant="primary" size="sm">Small</Button>
    <Button variant="primary" size="md">Medium</Button>
    <Button variant="primary" size="lg">Large</Button>
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
    <Button variant="primary" disabled>Disabled</Button>
    <Button variant="secondary" disabled>Disabled</Button>
    <Button variant="primary" href="#">As a link</Button>
  </Inline>
);

export const FullWidth = () => (
  <div style={{ width: "20rem" }}>
    <Button variant="primary" fullWidth>Approve option B</Button>
  </div>
);
