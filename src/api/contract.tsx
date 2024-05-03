// contract.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const slug = z.string();

const GuessSchema = z.object({
    canonicalInput: z.string(),
    response: z.string(),
    timestamp: z.string().datetime(),
});

const PuzzleLockEnum = z.enum(["locked", "unlockable", "unlocked"]).default("locked");

const PuzzleSummarySchema = z.object({
    round: slug,
    // visible implied by existence
    locked: PuzzleLockEnum,
    answer: z.string().optional(),
})

const PuzzleStateSchema = PuzzleSummarySchema.extend({
    guesses: z.array(GuessSchema).default([]),
});

const RoundStateSchema = z.object({
    name: z.string(),
    slots: z.record(z.string(), slug),
})

const TeamStateSchema = z.object({
    teamName: z.string(),
    rounds: z.record(slug, RoundStateSchema),
    puzzles: z.record(slug, PuzzleSummarySchema),
});

export const contract = c.router({
    getMyTeamState: {
        method: 'GET',
        path: `/me`,
        responses: {
            200: TeamStateSchema,
        },
        summary: 'Get my team state',
    },
    getPuzzleState: {
        method: 'GET',
        path: `/puzzle/:slug`,
        responses: {
            200: PuzzleStateSchema,
            404: z.null(),
        },
        summary: 'Get the state of one puzzle',
    },
});