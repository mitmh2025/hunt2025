import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DesertedNinjaDataProvider } from "../DesertedNinjaDataProvider";
import { DesertedNinjaHost } from "../components/DesertedNinjaHost";
import { DesertedNinjaScheduling } from "../components/DesertedNinjaScheduling";
import { DesertedNinjaScorekeeper } from "../components/DesertedNinjaScorekeeper";
import { SessionSelect } from "../components/DesertedNinjaSessionSelector";
import "react-tabs/style/react-tabs.css";

export default function DesertedNinjaStub() {
  return (
    <>
      <DesertedNinjaDataProvider>
        <SessionSelect buttonText="Select" />
        <Tabs>
          <TabList>
            <Tab>Scheduling</Tab>
            <Tab>Hosts</Tab>
            <Tab>Scorekeepers</Tab>
          </TabList>
          <TabPanel>
            <DesertedNinjaScheduling />
          </TabPanel>
          <TabPanel>
            <DesertedNinjaHost />
          </TabPanel>
          <TabPanel>
            <DesertedNinjaScorekeeper />
          </TabPanel>
        </Tabs>
      </DesertedNinjaDataProvider>
    </>
  );
}
