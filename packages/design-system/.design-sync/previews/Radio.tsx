import { RadioGroup, Radio } from "executive-ui";

export const Vertical = () => (
  <RadioGroup label="Rollout approach" description="Decides which teams move first." value="pilot">
    <Radio value="pilot" label="Pilot with two teams" description="Lowest risk, slowest." />
    <Radio value="waves" label="Three waves" />
    <Radio value="all" label="All at once" description="Unavailable until vendor capacity is confirmed." disabled />
  </RadioGroup>
);

export const HorizontalWithError = () => (
  <RadioGroup label="Decision" orientation="horizontal" value="defer" error="Add a target date before deferring.">
    <Radio value="approve" label="Approve" />
    <Radio value="defer" label="Defer" />
    <Radio value="reject" label="Reject" />
  </RadioGroup>
);
