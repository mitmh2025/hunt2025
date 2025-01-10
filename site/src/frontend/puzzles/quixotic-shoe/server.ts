import type { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Router } from "websocket-express";

const mysteryHuntPlusHandler = async (req: Request, res: Response) => {
  if (!req.teamState) {
    // Not logged in
    res.sendStatus(404);
    return;
  }
  const teamId = req.teamState.teamId;
  await req.frontendApi.adFrequencyQuixoticShoe({
    params: { teamId: `${teamId}` },
    body: { status: "plus" },
  });
  // no particular reply here, puzzle state is expected to come in via websocket
  res.json({});
};

const mysteryHuntRegularHandler = async (req: Request, res: Response) => {
  if (!req.teamState) {
    // Not logged in
    res.sendStatus(404);
    return;
  }
  const teamId = req.teamState.teamId;
  await req.frontendApi.adFrequencyQuixoticShoe({
    params: { teamId: `${teamId}` },
    body: { status: null },
  });
  // no particular reply here, puzzle state is expected to come in via websocket
  res.json({});
};

const mysteryHuntMinusHandler = async (req: Request, res: Response) => {
  if (!req.teamState) {
    // Not logged in
    res.sendStatus(404);
    return;
  }
  const teamId = req.teamState.teamId;
  await req.frontendApi.adFrequencyQuixoticShoe({
    params: { teamId: `${teamId}` },
    body: { status: "minus" },
  });
  // no particular reply here, puzzle state is expected to come in via websocket
  res.json({});
};

const router = new Router();
router.post("/mysteryHuntPlus", expressAsyncHandler(mysteryHuntPlusHandler));
router.post(
  "/mysteryHuntRegular",
  expressAsyncHandler(mysteryHuntRegularHandler),
);
router.post("/mysteryHuntMinus", expressAsyncHandler(mysteryHuntMinusHandler));
export default router;
