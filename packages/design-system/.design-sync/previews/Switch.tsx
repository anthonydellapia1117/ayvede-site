import { useState } from "react";
import { Switch, Stack } from "executive-ui";

export const States = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <Stack gap={4}>
      <Switch checked={a} onCheckedChange={setA} label="Weekly status digest" description="Sent Monday mornings to sponsors." />
      <Switch checked={b} onCheckedChange={setB} label="Require two approvers" />
      <Switch checked size="sm" onCheckedChange={() => {}} label="Small switch" />
      <Switch checked={false} onCheckedChange={() => {}} label="Locked setting" disabled />
    </Stack>
  );
};
