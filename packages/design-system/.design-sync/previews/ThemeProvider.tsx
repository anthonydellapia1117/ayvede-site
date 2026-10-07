import { ThemeProvider, Card, Text, Button, Inline } from "executive-ui";

export const LightAndDark = () => (
  <Inline gap={4} align="stretch">
    <ThemeProvider mode="light">
      <Card title="Light theme" description="Default mode" style={{ width: "16rem" }}>
        <Text variant="compact">Canvas, surface, and text roles for daylight reading.</Text>
      </Card>
    </ThemeProvider>
    <ThemeProvider mode="dark">
      <div style={{ padding: "1rem" }}>
        <Card title="Dark theme" description="mode=&quot;dark&quot;" style={{ width: "16rem" }}>
          <Text variant="compact">Same roles, re-mapped for low light. Nest a provider to flip one region.</Text>
        </Card>
      </div>
    </ThemeProvider>
  </Inline>
);

export const NestedRegion = () => (
  <ThemeProvider mode="light">
    <Card title="Report" description="Light page with a dark summary band">
      <ThemeProvider mode="dark">
        <div style={{ padding: "1rem", borderRadius: "0.5rem" }}>
          <Text weight="medium">Bottom line: approve option B.</Text>
          <Button variant="primary" size="sm" style={{ marginTop: "0.75rem" }}>Approve</Button>
        </div>
      </ThemeProvider>
    </Card>
  </ThemeProvider>
);
