import { Section, Container, Heading, Text, Stack } from "executive-ui";

export const Tones = () => (
  <Stack gap={0}>
    <Section spacing="sm" tone="canvas"><Container><Heading level={2} size="3">Canvas band</Heading><Text variant="compact" tone="secondary">The default page background.</Text></Container></Section>
    <Section spacing="sm" tone="surface" bordered><Container><Heading level={2} size="3">Surface band</Heading><Text variant="compact" tone="secondary">A lifted white band.</Text></Container></Section>
    <Section spacing="sm" tone="subtle" bordered><Container><Heading level={2} size="3">Subtle band</Heading><Text variant="compact" tone="secondary">A quiet tinted band.</Text></Container></Section>
    <Section spacing="sm" tone="inverse"><Container><Heading level={2} size="3" tone="inverse">Inverse band</Heading><Text variant="compact" tone="secondary">For a closing call to action.</Text></Container></Section>
  </Stack>
);
