import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  //  type DesertedNinjaAnswer,
  //  type DesertedNinjaRegistration,
  type DesertedNinjaSession,
  type DesertedNinjaQuestion,
} from "../../../lib/api/admin_contract";
import { useOpsData } from "../OpsDataProvider";
import { DesertedNinjaHost } from "../components/DesertedNinjaHost";
import { DesertedNinjaScheduling } from "../components/DesertedNinjaScheduling";
import { DesertedNinjaScorekeeper } from "../components/DesertedNinjaScorekeeper";
import { retrieveDesertedNinjaData } from "../opsdata/desertedNinja.ts";
import "react-tabs/style/react-tabs.css";

export default function DesertedNinjaStub() {
  const [sessions, setSessions] = useState<DesertedNinjaSession[]>([]);
  const [questions, setQuestions] = useState<DesertedNinjaQuestion[]>([]);
  const opsData = useOpsData();

  useEffect(() => {
    retrieveDesertedNinjaData(opsData, setQuestions, setSessions);
  }, [opsData]);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Scheduling</Tab>
          <Tab>Hosts</Tab>
          <Tab>Scorekeepers</Tab>
        </TabList>
        <TabPanel>
          <DesertedNinjaScheduling sessions={sessions} questions={questions} />
        </TabPanel>
        <TabPanel>
          <DesertedNinjaHost sessions={sessions} questions={questions} />
        </TabPanel>
        <TabPanel>
          <DesertedNinjaScorekeeper sessions={sessions} questions={questions} />
        </TabPanel>
      </Tabs>
    </>
  );
}
