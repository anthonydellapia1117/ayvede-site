import { Alert, Button, Stack } from "executive-ui";

export const Tones = () => (
  <Stack gap={3} style={{ maxWidth: "36rem" }}>
    <Alert tone="info" title="Model refreshed">Figures reflect the finance model as of this morning.</Alert>
    <Alert tone="success" title="Discovery complete">All 14 integrations are inventoried.</Alert>
    <Alert tone="warning" title="Contract renews in 84 days">Give notice by 15 November to avoid a 12-month auto-renewal.</Alert>
    <Alert tone="danger" title="Board pack export failed">Two charts are missing source data. Retry after the 9:00 model refresh.</Alert>
  </Stack>
);

export const WithActionsAndDismiss = () => (
  <Stack gap={3} style={{ maxWidth: "36rem" }}>
    <Alert tone="warning" title="Contract renews in 84 days" actions={<><Button size="sm" variant="secondary">View contract</Button><Button size="sm" variant="ghost">Remind me later</Button></>} onDismiss={() => {}}>
      Give notice by 15 November to avoid a 12-month auto-renewal.
    </Alert>
    <Alert tone="info" onDismiss={() => {}}>Figures stay illustrative until finance signs off the model on 14 October.</Alert>
  </Stack>
);
