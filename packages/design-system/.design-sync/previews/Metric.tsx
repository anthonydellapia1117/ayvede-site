import { Metric, Grid } from "executive-ui";

export const Group = () => (
  <Grid columns="auto" min="11rem">
    <Metric label="Annual run cost" value="$1.84" unit="M" change={{ value: "-0.62M", direction: "down", sentiment: "negative", label: "vs. today" }} context="Three-year average under option B." source="Finance model v4" illustrative />
    <Metric label="Seat utilization" value="80%" change={{ value: "+41 pts", direction: "up", label: "vs. 39% today" }} context="Projected under option B." source="Admin consoles" illustrative />
    <Metric label="Integrations to migrate" value="14" context="Two are undocumented; both sit in the approvals tool." source="Architecture inventory" illustrative />
  </Grid>
);

export const Sizes = () => (
  <Grid columns="auto" min="8rem">
    <Metric size="sm" label="Median approval time" value="12.4" unit="days" illustrative />
    <Metric size="md" label="Median approval time" value="12.4" unit="days" illustrative />
    <Metric size="lg" label="Median approval time" value="12.4" unit="days" illustrative />
  </Grid>
);
