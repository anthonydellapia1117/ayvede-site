import { Grid, Card, Text } from "executive-ui";

export const AutoFit = () => (
  <Grid columns="auto" min="12rem">
    {[
      ["Procurement", "Three contracts renew in Q1"],
      ["Legal operations", "Intake volume down 12 percent (illustrative)"],
      ["Facilities", "Two leases under review"],
      ["Finance", "Close cycle at six days (illustrative)"],
    ].map(([title, summary]) => (
      <Card key={title} title={title}><Text variant="compact">{summary}</Text></Card>
    ))}
  </Grid>
);

export const ThreeColumns = () => (
  <Grid columns={3}>
    <Card title="Cost"><Text variant="compact">$2.4M over three years (illustrative)</Text></Card>
    <Card title="Risk"><Text variant="compact">Three open, one rated high</Text></Card>
    <Card title="Timeline"><Text variant="compact">Pilot in Q1, rollout by Q3</Text></Card>
  </Grid>
);
