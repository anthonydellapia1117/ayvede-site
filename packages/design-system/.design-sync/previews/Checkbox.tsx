import { Checkbox, Stack } from "executive-ui";

export const States = () => (
  <Stack gap={4}>
    <Checkbox label="Include archived requests" description="Adds 1,120 closed items to the export." defaultChecked />
    <Checkbox label="Notify sponsors" />
    <Checkbox label="Select all" indeterminate />
    <Checkbox label="Unavailable option" disabled />
    <Checkbox label="Accept the data-handling terms" invalid />
  </Stack>
);
