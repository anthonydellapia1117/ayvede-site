import { ThemeProvider, Card, Text, Button, Grid, Stack } from "executive-ui";

export const LightAndDark = () => (
  <Grid columns={2} gap={4} style={{ maxWidth: "40rem" }}>
    <Stack gap={2}>
      <Text variant="eyebrow">Light</Text>
      <div style={{ display: "grid", border: "1px solid var(--eui-color-border-default)", borderRadius: "var(--eui-radius-lg)", overflow: "hidden" }}>
        <ThemeProvider mode="light">
          <div style={{ padding: "1rem" }}>
            <Card title="Quarterly operating review" description="Updated 3 days ago">
              <Text variant="compact">Operating margin 18.4 percent, up 1.2 points (illustrative).</Text>
            </Card>
          </div>
        </ThemeProvider>
      </div>
    </Stack>
    <Stack gap={2}>
      <Text variant="eyebrow">Dark</Text>
      <div style={{ display: "grid", border: "1px solid var(--eui-color-border-default)", borderRadius: "var(--eui-radius-lg)", overflow: "hidden" }}>
        <ThemeProvider mode="dark">
          <div style={{ padding: "1rem" }}>
            <Card title="Quarterly operating review" description="Updated 3 days ago">
              <Text variant="compact">Operating margin 18.4 percent, up 1.2 points (illustrative).</Text>
            </Card>
          </div>
        </ThemeProvider>
      </div>
    </Stack>
  </Grid>
);

export const NestedRegion = () => (
  <ThemeProvider mode="light">
    <Card title="Platform consolidation review" description="Decision brief for the steering committee, 30 September">
      <div style={{ borderRadius: "var(--eui-radius-md)", overflow: "hidden" }}>
        <ThemeProvider mode="dark">
          <div style={{ padding: "1rem" }}>
            <Stack gap={3} align="start">
              <Text weight="medium">Bottom line: renew the incumbent suite and retire the two overlapping tools by Q3.</Text>
              <Text variant="compact" tone="secondary">Saves an estimated $1.1M a year (illustrative).</Text>
              <Button variant="primary" size="sm">Approve recommendation</Button>
            </Stack>
          </div>
        </ThemeProvider>
      </div>
    </Card>
  </ThemeProvider>
);
