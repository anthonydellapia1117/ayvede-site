import { VisuallyHidden, Button, Icon } from "executive-ui";

export const InsideAButton = () => (
  <Button variant="secondary" iconStart={<Icon name="document" />}>
    PDF
    <VisuallyHidden> (download the brief)</VisuallyHidden>
  </Button>
);
