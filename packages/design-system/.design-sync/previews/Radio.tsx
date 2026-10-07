import { RadioGroup, Radio, Stack } from "executive-ui";

export const Vertical = () => (
  <RadioGroup label="Rollout approach" description="Decides which teams move first." defaultValue="pilot">
    <Radio value="pilot" label="Pilot with two teams" description="Lowest risk, slowest." />
    <Radio value="waves" label="Three waves" />
    <Radio value="all" label="All at once" description="Needs vendor capacity confirmed." />
  </RadioGroup>
);

export const HorizontalWithError = () => (
  <Stack gap={6}>
    <RadioGroup label="Decision" orientation="horizontal" error="Choose one option to continue.">
      <Radio value="approve" label="Approve" />
      <Radio value="defer" label="Defer" />
      <Radio value="reject" label="Reject" />
    </RadioGroup>
    <RadioGroup label="Locked choice" disabled defaultValue="b">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  </Stack>
);
