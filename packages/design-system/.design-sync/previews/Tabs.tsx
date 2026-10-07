import { Tabs, TabList, Tab, TabPanel, Text } from "executive-ui";

export const Default = () => (
  <Tabs defaultValue="summary" style={{ maxWidth: "36rem" }}>
    <TabList label="Brief sections">
      <Tab value="summary">Summary</Tab>
      <Tab value="risks">Risks</Tab>
      <Tab value="plan">Plan</Tab>
      <Tab value="archive" disabled>Archive</Tab>
    </TabList>
    <TabPanel value="summary"><Text variant="compact">Three tools cover the same workflow; consolidate on the incumbent.</Text></TabPanel>
    <TabPanel value="risks"><Text variant="compact">Two undocumented connectors need discovery.</Text></TabPanel>
    <TabPanel value="plan"><Text variant="compact">Pilot two teams, then three waves.</Text></TabPanel>
  </Tabs>
);
