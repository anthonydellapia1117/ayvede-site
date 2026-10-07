import { Tabs, TabList, Tab, TabPanel, Text } from "executive-ui";

export const InsideTabs = () => (
  <Tabs defaultValue="open" style={{ maxWidth: "30rem" }}>
    <TabList label="Requests">
      <Tab value="open">Open (12)</Tab>
      <Tab value="closed">Closed (1,120)</Tab>
      <Tab value="draft" disabled>Drafts</Tab>
    </TabList>
    <TabPanel value="open"><Text variant="compact">Twelve open requests.</Text></TabPanel>
    <TabPanel value="closed"><Text variant="compact">Closed requests.</Text></TabPanel>
  </Tabs>
);
