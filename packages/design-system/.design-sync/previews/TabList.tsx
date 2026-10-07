import { Tabs, TabList, Tab, TabPanel, Text } from "executive-ui";

export const InsideTabs = () => (
  <Tabs defaultValue="a" style={{ maxWidth: "30rem" }}>
    <TabList label="Example">
      <Tab value="a">First</Tab>
      <Tab value="b">Second</Tab>
    </TabList>
    <TabPanel value="a"><Text variant="compact">TabList holds the triggers and handles arrow keys.</Text></TabPanel>
    <TabPanel value="b"><Text variant="compact">Second panel.</Text></TabPanel>
  </Tabs>
);
