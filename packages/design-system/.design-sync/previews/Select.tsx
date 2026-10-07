import { Select, Field, Stack } from "executive-ui";

export const InAField = () => (
  <Stack gap={5} style={{ maxWidth: "24rem" }}>
    <Field label="Region">
      <Select placeholder="Choose a region" options={[{ value: "na", label: "North America" }, { value: "eu", label: "Europe" }, { value: "apac", label: "Asia Pacific" }]} />
    </Field>
    <Field label="Rollout wave" description="Teams move in the wave shown." error="Wave 1 is full. Pick another wave.">
      <Select options={[{ value: "1", label: "Wave 1 (pilot)" }, { value: "2", label: "Wave 2" }, { value: "3", label: "Wave 3", disabled: true }]} defaultValue="1" />
    </Field>
    <Field label="Owner" disabled>
      <Select options={[{ value: "po", label: "Program office" }]} defaultValue="po" />
    </Field>
  </Stack>
);
