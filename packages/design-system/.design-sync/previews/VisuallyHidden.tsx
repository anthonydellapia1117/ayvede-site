import { VisuallyHidden, Button, Icon, Stack, Text } from "executive-ui";

export const InsideAButton = () => (
  <Stack gap={2} align="start">
    <Button variant="secondary" iconStart={<Icon name="document" />}>
      Download PDF
      <VisuallyHidden>, board brief, 12 pages</VisuallyHidden>
    </Button>
    <Text variant="meta">Screen readers announce: Download PDF, board brief, 12 pages</Text>
  </Stack>
);
