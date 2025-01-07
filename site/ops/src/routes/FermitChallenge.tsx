import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FermitDataProvider } from "../FermitDataProvider";
import { FermitPresentation } from "../components/FermitPresentation";
import { FermitScheduling } from "../components/FermitScheduling";
import { FermitScorekeeper } from "../components/FermitScorekeeper";
import { FermitSessionSelector } from "../components/FermitSessionSelector";
import "react-tabs/style/react-tabs.css";

export default function FermitChallenge() {
  return (
    <>
      <FermitDataProvider>
        <FermitSessionSelector buttonText="Select" />
        <Tabs>
          <TabList>
            <Tab>Scheduling</Tab>
            <Tab>Hosts</Tab>
            <Tab>Scorekeepers</Tab>
          </TabList>
          <TabPanel>
            <FermitScheduling />
          </TabPanel>
          <TabPanel>
            <FermitPresentation />
          </TabPanel>
          <TabPanel>
            <FermitScorekeeper />
          </TabPanel>
        </Tabs>
      </FermitDataProvider>
    </>
  );
}
