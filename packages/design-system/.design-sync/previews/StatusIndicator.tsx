import { StatusIndicator, Inline, Stack } from "executive-ui";

export const AllStatuses = () => (
  <Stack gap={2}>
    <StatusIndicator status="success" label="On track" />
    <StatusIndicator status="warning" label="At risk" />
    <StatusIndicator status="danger" label="Blocked" />
    <StatusIndicator status="info" label="In review" />
    <StatusIndicator status="pending" label="Not started" />
    <StatusIndicator status="neutral" label="Archived" />
  </Stack>
);

export const Small = () => (
  <Inline gap={4}>
    <StatusIndicator size="sm" status="success" label="Keep" />
    <StatusIndicator size="sm" status="warning" label="Migrate" />
    <StatusIndicator size="sm" status="danger" label="Exit" />
  </Inline>
);
