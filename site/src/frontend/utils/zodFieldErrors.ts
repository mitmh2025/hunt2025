export function responseIsZodError(resp: { status: number; body: unknown }) {
  if (resp.status !== 400) {
    return false;
  }

  if (typeof resp.body !== "object") {
    return false;
  }

  if (resp.body === null) {
    return false;
  }

  if (!("name" in resp.body)) {
    return false;
  }

  return resp.body.name === "ZodError";
}

export function responseToZodErrors(resp: { status: number; body: unknown }) {
  const body = resp.body as {
    name: string;
    issues: { message: string; path: string[] }[];
  };

  const errors: Record<string, string> = {};
  for (const issue of body.issues) {
    errors[issue.path.join(".")] = issue.message;
  }

  return errors;
}
