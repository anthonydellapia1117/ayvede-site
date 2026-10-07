import { StatusIndicator, Inline } from "executive-ui";

export const AllStatuses = () => (
  <Inline gap={5}>
    <StatusIndicator status="success" label="On track" />
    <StatusIndicator status="warning" label="At risk" />
    <StatusIndicator status="danger" label="Blocked" />
    <StatusIndicator status="info" label="In review" />
    <StatusIndicator status="pending" label="Not started" />
    <StatusIndicator status="neutral" label="Archived" />
  </Inline>
);

export const Small = () => (
  <Inline gap={4}>
    <StatusIndicator size="sm" status="success" label="Keep" />
    <StatusIndicator size="sm" status="warning" label="Migrate" />
    <StatusIndicator size="sm" status="danger" label="Exit" />
  </Inline>
);
