import { Tabs, TabList, Tab, TabPanel, Text } from "executive-ui";

export const InsideTabs = () => (
  <Tabs defaultValue="overview" style={{ maxWidth: "30rem" }}>
    <TabList label="Request sections">
      <Tab value="overview">Overview</Tab>
      <Tab value="approvals">Approvals</Tab>
      <Tab value="history">History</Tab>
    </TabList>
    <TabPanel value="overview"><Text variant="compact">REQ-2024-00187 was submitted by Procurement and is waiting on legal review.</Text></TabPanel>
    <TabPanel value="approvals"><Text variant="compact">Two of three approvers have signed off.</Text></TabPanel>
    <TabPanel value="history"><Text variant="compact">Six changes since submission.</Text></TabPanel>
  </Tabs>
);
