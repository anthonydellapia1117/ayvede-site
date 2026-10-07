import { TextInput, Field, Stack, Icon } from "executive-ui";

export const InAField = () => (
  <Stack gap={5} style={{ maxWidth: "24rem" }}>
    <Field label="Full name" required>
      <TextInput placeholder="First and last name" />
    </Field>
    <Field label="Work email" error="Enter an address at your organization's domain.">
      <TextInput type="email" defaultValue="j.doe@example" />
    </Field>
  </Stack>
);

export const Adornments = () => (
  <Stack gap={5} style={{ maxWidth: "24rem" }}>
    <Field label="Budget ceiling" description="Annual, in thousands.">
      <TextInput inputMode="decimal" startAdornment="$" endAdornment="k" defaultValue="250" />
    </Field>
    <Field label="Search requests">
      <TextInput type="search" startAdornment={<Icon name="search" />} placeholder="Request id or title" />
    </Field>
  </Stack>
);

export const SizesAndStates = () => (
  <Stack gap={3} style={{ maxWidth: "24rem" }}>
    <TextInput size="sm" aria-label="Small" placeholder="Small" />
    <TextInput size="md" aria-label="Medium" placeholder="Medium" />
    <TextInput size="lg" aria-label="Large" placeholder="Large" />
    <TextInput aria-label="Disabled" disabled defaultValue="Disabled" />
    <TextInput aria-label="Reference" mono readOnly defaultValue="REQ-2024-00187" />
  </Stack>
);
