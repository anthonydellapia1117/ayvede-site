import { Checkbox, Stack } from "executive-ui";

export const States = () => (
  <Stack gap={4}>
    <Checkbox label="Include archived requests" description="Adds 1,120 closed items to the export." defaultChecked />
    <Checkbox label="Notify sponsors" />
    <Checkbox label="All regions (2 of 4 selected)" indeterminate />
    <Checkbox label="Include draft requests" description="Drafts are excluded from board exports." disabled />
    <Checkbox label="Accept the data-handling terms" description="Required before the export runs." invalid />
  </Stack>
);
