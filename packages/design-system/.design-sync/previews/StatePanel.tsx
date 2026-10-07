import { StatePanel, Button, Icon, Grid } from "executive-ui";

export const AllKinds = () => (
  <Grid columns={2}>
    <StatePanel kind="empty" title="No requests yet" description="Requests submitted through the intake form will appear here." actions={<Button variant="primary" size="sm" iconStart={<Icon name="plus" />}>New request</Button>} />
    <StatePanel kind="loading" title="Loading the finance model" description="Usually takes a few seconds." />
    <StatePanel kind="error" title="Could not load integrations" description="The inventory is unavailable. Your view is unchanged." actions={<Button size="sm" variant="secondary">Retry</Button>} />
    <StatePanel kind="success" title="Decision recorded" description="Option B was approved." actions={<Button size="sm" variant="secondary">View work order</Button>} />
  </Grid>
);

export const Unframed = () => <StatePanel kind="empty" frame={false} title="Nothing to review" description="You are up to date." />;
