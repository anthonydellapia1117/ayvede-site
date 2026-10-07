import { Field, TextInput, Select, Textarea, Stack } from "executive-ui";

export const LabelDescriptionError = () => (
  <Stack gap={5} style={{ maxWidth: "24rem" }}>
    <Field label="Full name" required>
      <TextInput autoComplete="name" />
    </Field>
    <Field label="Work email" description="We never share it." error="Enter a valid address." required>
      <TextInput type="email" defaultValue="j.doe@example" />
    </Field>
    <Field label="Cost center" showOptional>
      <Select placeholder="Choose" options={[{ value: "ops", label: "Operations" }, { value: "fin", label: "Finance" }]} />
    </Field>
    <Field label="Notes" description="Visible to reviewers only.">
      <Textarea rows={2} />
    </Field>
    <Field label="Reference" disabled>
      <TextInput defaultValue="REQ-2024-00187" mono />
    </Field>
  </Stack>
);
