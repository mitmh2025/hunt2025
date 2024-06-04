import { requestAsyncLocalStorage } from "./request-async-local-storage";

export function useRequest() {
  const req = requestAsyncLocalStorage.getStore();
  if (!req) {
    throw new Error(
      `useRequest was called outside of an asynchronous context initialized by calling requestAsyncLocalStorage.run()`,
    );
  }
  return req;
}
