import { Skeleton, Stack, Card } from "executive-ui";

export const CardPlaceholder = () => (
  <Card style={{ maxWidth: "22rem" }}>
    <Stack gap={3}>
      <Skeleton height="1.5rem" width="60%" />
      <Skeleton lines={3} />
      <Skeleton height="2.25rem" width="8rem" />
    </Stack>
  </Card>
);
