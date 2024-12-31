import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useOpsData, type OpsData } from "../OpsDataProvider";
import { retrieveScores, retrieveSessions } from "../opsdata/desertedNinja.ts";
import { type DesertedNinjaScore, type DesertedNinjaSession } from "../../../lib/api/admin_contract";
import 'react-tabs/style/react-tabs.css';

export default function DesertedNinjaStub() {
  const [scores, setScores] = useState<DesertedNinjaScore>({
    sessionId: -1,
    teamId: -1,
    scores: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  });
  const [sessions, setSessions] = useState< DesertedNinjaSession[] >( [] );
  const opsData = useOpsData();
  
  useEffect( () => {
    retrieveScores(opsData, 1, setScores);
    retrieveSessions(opsData, setSessions);
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
          <p>Host mode</p>
        </TabPanel>
        <TabPanel>
          <p>Scorekeeper mode</p>
        </TabPanel>
      </Tabs>
    </>
  );
}
