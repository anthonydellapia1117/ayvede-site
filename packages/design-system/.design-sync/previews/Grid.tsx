import { Grid, Card, Text } from "executive-ui";

export const AutoFit = () => (
  <Grid columns="auto" min="12rem">
    {["Procurement", "Legal operations", "Facilities", "Finance"].map((t) => (
      <Card key={t} title={t}><Text variant="compact">Team summary</Text></Card>
    ))}
  </Grid>
);

export const ThreeColumns = () => (
  <Grid columns={3}>
    <Card title="Cost"><Text variant="compact">Three-year view</Text></Card>
    <Card title="Risk"><Text variant="compact">Top three</Text></Card>
    <Card title="Timeline"><Text variant="compact">Two quarters</Text></Card>
  </Grid>
);
