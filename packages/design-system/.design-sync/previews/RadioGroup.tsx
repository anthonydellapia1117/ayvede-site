import { RadioGroup, Radio, Stack } from "executive-ui";

export const Vertical = () => (
  <RadioGroup label="Rollout approach" description="Decides which teams move first." value="pilot">
    <Radio value="pilot" label="Pilot with two teams" description="Lowest risk, slowest." />
    <Radio value="waves" label="Three waves" />
    <Radio value="all" label="All at once" description="Needs vendor capacity confirmed." />
  </RadioGroup>
);

export const HorizontalAndStates = () => (
  <Stack gap={6}>
    <RadioGroup label="Decision" orientation="horizontal" value="defer" error="Add a target date before deferring.">
      <Radio value="approve" label="Approve" />
      <Radio value="defer" label="Defer" />
      <Radio value="reject" label="Reject" />
    </RadioGroup>
    <RadioGroup label="Funding source" disabled value="capital">
      <Radio value="operating" label="Operating budget" />
      <Radio value="capital" label="Capital budget" />
    </RadioGroup>
  </Stack>
);
