import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useOpsData, type OpsData } from "../OpsDataProvider";
import { retrieveDesertedNinjaData } from "../opsdata/desertedNinja.ts";
import { DesertedNinjaHost } from "../components/DesertedNinjaHost";
import { DesertedNinjaScorekeeper } from "../components/DesertedNinjaScorekeeper";
import { type DesertedNinjaScore, type DesertedNinjaSession, type DesertedNinjaQuestion } from "../../../lib/api/admin_contract";
import 'react-tabs/style/react-tabs.css';

export default function DesertedNinjaStub() {
  const [sessions, setSessions] = useState<DesertedNinjaSession[]>( [] );
  const [questions, setQuestions] = useState<DesertedNinjaQuestion[]>( [] );
  const opsData = useOpsData();
  
  useEffect( () => {
    retrieveDesertedNinjaData(opsData, setQuestions, setSessions);
  }, []);
  
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Sessions</Tab>
          <Tab>Hosts</Tab>
          <Tab>Scorekeepers</Tab>
        </TabList>
        <TabPanel>
          {sessions.map((session) => (
            <details key={session.sessionId}>
              <summary>{session.title}</summary>
              <p>Teams: {session.teamIds}</p>
              <p>{session.questionIds}</p>
            </details>
          ))}
        </TabPanel>
        <TabPanel>
          <DesertedNinjaHost sessions={sessions} questions={questions} />
        </TabPanel>
        <TabPanel>
          <DesertedNinjaScorekeeper sessions={sessions} />
        </TabPanel>
      </Tabs>
    </>
  );
}
