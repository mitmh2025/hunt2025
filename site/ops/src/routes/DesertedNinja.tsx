import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useOpsData, type OpsData } from "../OpsDataProvider";
import { retrieveScores, retrieveSessions, retrieveQuestions } from "../opsdata/desertedNinja.ts";
import { DesertedNinjaHost } from "../components/DesertedNinjaHost";
import { type DesertedNinjaScore, type DesertedNinjaSession, type DesertedNinjaQuestion } from "../../../lib/api/admin_contract";
import 'react-tabs/style/react-tabs.css';

export default function DesertedNinjaStub() {
  const [scores, setScores] = useState<DesertedNinjaScore>({
    sessionId: -1,
    teamId: -1,
    scores: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  });
  const [sessions, setSessions] = useState<DesertedNinjaSession[]>( [] );
  const [questions, setQuestions] = useState<DesertedNinjaQuestion[]>( [] );
  const opsData = useOpsData();
  
  useEffect( () => {
    retrieveScores(opsData, 1, setScores);
    retrieveSessions(opsData, setSessions);
    retrieveQuestions(opsData, [1,2], setQuestions);
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
          <p>Scorekeeper mode</p>
        </TabPanel>
      </Tabs>
    </>
  );
}
