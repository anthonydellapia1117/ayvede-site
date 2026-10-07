import { Container, Text } from "executive-ui";

const Box = ({ label }: { label: string }) => (
  <div style={{ border: "1px dashed var(--eui-color-border-strong)", padding: "0.75rem", borderRadius: "0.375rem" }}>
    <Text variant="compact">{label}</Text>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "grid", gap: "0.75rem" }}>
    <Container size="reading"><Box label="reading (42rem): prose" /></Container>
    <Container size="content"><Box label="content (72rem): pages" /></Container>
    <Container size="wide"><Box label="wide (90rem): data-dense views" /></Container>
  </div>
);
