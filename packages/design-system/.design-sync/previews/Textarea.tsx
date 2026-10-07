import { Textarea, Field, Stack } from "executive-ui";

export const InAField = () => (
  <Stack gap={5} style={{ maxWidth: "28rem" }}>
    <Field label="Context" description="What should the reviewer know?">
      <Textarea placeholder="Two or three sentences are enough." rows={3} />
    </Field>
    <Field label="Justification" error="Required when the budget exceeds the ceiling.">
      <Textarea rows={3} />
    </Field>
  </Stack>
);
