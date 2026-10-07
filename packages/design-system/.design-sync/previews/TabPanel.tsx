import { Tabs, TabList, Tab, TabPanel, Text } from "executive-ui";

export const InsideTabs = () => (
  <Tabs defaultValue="one" style={{ maxWidth: "30rem" }}>
    <TabList label="Panels">
      <Tab value="one">One</Tab>
      <Tab value="two">Two</Tab>
    </TabList>
    <TabPanel value="one"><Text variant="compact">Only the selected panel is rendered unless keepMounted is set.</Text></TabPanel>
    <TabPanel value="two" keepMounted><Text variant="compact">This panel stays mounted but hidden.</Text></TabPanel>
  </Tabs>
);
