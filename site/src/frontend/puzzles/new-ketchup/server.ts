import { type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Router } from "websocket-express";
import { generateCaseFile } from "./logic";

const speakHandler = async (req: Request, res: Response) => {
  if (!req.teamState) {
    // Not logged in
    res.sendStatus(404);
    return;
  }
  const teamId = req.teamState.teamId;
  await req.frontendApi.speakNewKetchup({
    params: { teamId: `${teamId}` },
  });
  // no particular reply here, puzzle state is expected to come in via websocket

  res.json({});
};

const caseFileHandler = async (req: Request, res: Response) => {
  if (!req.teamState) {
    res.sendStatus(404);
    return;
  }

  const team_id = req.teamState.teamId;
  const fullLog = await req.frontendApi.getFullPuzzleStateLog({
    query: { team_id, slug: "what_do_they_call_you" },
  });
  if (fullLog.status !== 200) {
    res.sendStatus(500);
    return;
  }

  const log = fullLog.body;
  const content = generateCaseFile(log);
  if (!content) {
    res.sendStatus(404);
    return;
  }

  res.contentType("text/plain");
  res.setHeader("Content-Disposition", `attachment; filename="case_file.txt"`);
  res.send(content);
  res.end();
};

const router = new Router();
router.post("/speak", expressAsyncHandler(speakHandler));
router.get("/case_file.txt", expressAsyncHandler(caseFileHandler));
export default router;
