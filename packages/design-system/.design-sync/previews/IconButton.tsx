import { IconButton, Icon, Inline } from "executive-ui";

export const Variants = () => (
  <Inline>
    <IconButton label="Search" icon={<Icon name="search" />} variant="ghost" />
    <IconButton label="Add" icon={<Icon name="plus" />} variant="secondary" />
    <IconButton label="Approve" icon={<Icon name="check" />} variant="primary" />
    <IconButton label="Remove" icon={<Icon name="x" />} variant="danger" />
  </Inline>
);

export const Sizes = () => (
  <Inline align="center">
    <IconButton label="Close" icon={<Icon name="x" />} size="sm" variant="secondary" />
    <IconButton label="Close" icon={<Icon name="x" />} size="md" variant="secondary" />
    <IconButton label="Close" icon={<Icon name="x" />} size="lg" variant="secondary" />
  </Inline>
);
