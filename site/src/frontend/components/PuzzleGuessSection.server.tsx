"use server";

import { z } from "zod";
import type { PuzzleState } from "../../../lib/api/client";
import { useRequest } from "../server/shared/actions";

const formSchema = z.object({
  guess: z.string(),
});

export type SubmitState = {
  errors?: string[];
  puzzleState: PuzzleState;
};

async function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function submitGuess(
  slug: string,
  prevState: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const validatedFields = formSchema.safeParse({
    guess: formData.get("guess"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors.guess,
      puzzleState: prevState.puzzleState,
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks -- This isn't a React Hook
  const req = useRequest();

  let result;
  try {
    result = await req.api.public.submitGuess({
      body: {
        guess: validatedFields.data.guess,
      },
      params: {
        slug,
      },
    });
  } catch (e) {
    return {
      errors: ["Network request failed"],
      puzzleState: prevState.puzzleState,
    };
  }

  if (result.status === 200) {
    if (process.env.NODE_ENV == "development") {
      await wait(500); // FIXME: For debugging.
    }
    return {
      puzzleState: result.body,
    };
  }
  // TODO: Handle other errors (rate-limit hit?)
  return {
    errors: [`Server returned status ${result.status}`],
    puzzleState: prevState.puzzleState,
  };
}
