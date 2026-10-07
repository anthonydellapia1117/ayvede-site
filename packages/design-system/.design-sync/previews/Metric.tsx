import { Metric, Grid } from "executive-ui";

export const Group = () => (
  <Grid columns={3}>
    <Metric label="Annual run cost" value="1.84" unit="M" change={{ value: "-0.62M", direction: "down", sentiment: "negative", label: "vs. today" }} context="Three-year average under option B." source="Finance model v4" illustrative />
    <Metric label="Seat utilization" value="39" unit="%" change={{ value: "+41 pts", direction: "up", label: "after consolidation" }} source="Admin consoles" illustrative />
    <Metric label="Integrations to migrate" value="14" change={{ value: "2 undocumented", direction: "flat", sentiment: "neutral" }} source="Architecture inventory" illustrative />
  </Grid>
);

export const Sizes = () => (
  <Grid columns={3}>
    <Metric size="sm" label="Small" value="12.4" unit="days" />
    <Metric size="md" label="Medium" value="12.4" unit="days" />
    <Metric size="lg" label="Large" value="12.4" unit="days" />
  </Grid>
);
