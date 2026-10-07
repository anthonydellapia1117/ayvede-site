import { Tabs, TabList, Tab, TabPanel, Text } from "executive-ui";

export const InsideTabs = () => (
  <Tabs defaultValue="notes" style={{ maxWidth: "30rem" }}>
    <TabList label="Request details">
      <Tab value="notes">Notes</Tab>
      <Tab value="attachments">Attachments</Tab>
    </TabList>
    <TabPanel value="notes"><Text variant="compact">The vendor asked for a 30-day extension on the renewal decision.</Text></TabPanel>
    <TabPanel value="attachments" keepMounted><Text variant="compact">Two files attached: the renewal quote and the security questionnaire.</Text></TabPanel>
  </Tabs>
);
