import { Container, Stack, Text } from "executive-ui";

export const Sizes = () => (
  <Stack gap={3}>
    {([
      ["reading", "Reading, 42rem", "Memos and decision briefs"],
      ["content", "Content, 72rem", "Briefs and report pages"],
      ["wide", "Wide, 90rem", "Tables and dashboards"],
    ] as const).map(([size, label, use]) => (
      <Container key={size} size={size} gutter={false}>
        <div style={{ padding: "var(--eui-space-3) var(--eui-space-4)", background: "var(--eui-color-background-surface)", border: "1px solid var(--eui-color-border-default)", borderRadius: "var(--eui-radius-md)" }}>
          <Text variant="compact"><strong>{label}.</strong> {use}</Text>
        </div>
      </Container>
    ))}
  </Stack>
);
