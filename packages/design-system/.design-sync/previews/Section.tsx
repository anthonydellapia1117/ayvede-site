import { Section, Container, Heading, Text, Stack } from "executive-ui";

export const Tones = () => (
  <Stack gap={0}>
    <Section spacing="sm" tone="canvas"><Container><Stack gap={1}><Heading level={2} size="3">Situation</Heading><Text variant="compact" tone="secondary">Three platforms overlap; spend is up 14 percent in two years (illustrative).</Text></Stack></Container></Section>
    <Section spacing="sm" tone="surface" bordered><Container><Stack gap={1}><Heading level={2} size="3">Options considered</Heading><Text variant="compact" tone="secondary">Keep, consolidate, or replace.</Text></Stack></Container></Section>
    <Section spacing="sm" tone="subtle" bordered><Container><Stack gap={1}><Heading level={2} size="3">Assumptions</Heading><Text variant="compact" tone="secondary">Figures are rounded and illustrative.</Text></Stack></Container></Section>
    <Section spacing="sm" tone="inverse"><Container><Stack gap={1}><Heading level={2} size="3" tone="inverse">Decision requested</Heading><Text variant="compact" tone="secondary">Approve consolidation by 14 November.</Text></Stack></Container></Section>
  </Stack>
);
