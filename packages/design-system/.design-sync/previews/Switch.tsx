import { useState } from "react";
import { Switch, Stack } from "executive-ui";

export const States = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <Stack gap={4}>
      <Switch checked={a} onCheckedChange={setA} label="Weekly status digest" description="Sent Monday mornings to sponsors." />
      <Switch checked={b} onCheckedChange={setB} label="Require two approvers" />
      <Switch checked={false} onCheckedChange={() => {}} label="Audit log retention (set by policy)" disabled />
    </Stack>
  );
};

export const Sizes = () => (
  <Stack gap={3}>
    <Switch size="sm" checked onCheckedChange={() => {}} label="Compact table rows" />
    <Switch checked onCheckedChange={() => {}} label="Show figures in thousands" />
  </Stack>
);
