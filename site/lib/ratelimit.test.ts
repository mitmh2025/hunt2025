import { expect, test } from "@jest/globals";
import { nextAcceptableSubmissionTime } from "./ratelimit";

const epoch = new Date(0);

test("empty history allows any time", () => {
  expect(nextAcceptableSubmissionTime([])).toStrictEqual(epoch);
});

test("any single guess allows any time", () => {
  const timestamps = [new Date("2024-09-10T05:35:57.487Z")];
  expect(nextAcceptableSubmissionTime(timestamps)).toStrictEqual(epoch);
});

test("two guesses at same time allow in one minute", () => {
  const timestamps = [
    new Date("2024-01-01T00:00:00Z"),
    new Date("2024-01-01T00:00:00Z"),
  ];
  const expectedTime = new Date("2024-01-01T00:01:00Z");
  expect(nextAcceptableSubmissionTime(timestamps)).toStrictEqual(expectedTime);
});

test("three guesses as quick as possible allow four minutes from first", () => {
  const timestamps = [
    new Date("2024-01-01T00:00:00Z"),
    new Date("2024-01-01T00:00:00Z"),
    new Date("2024-01-01T00:01:00Z"),
  ];
  const expectedTime = new Date("2024-01-01T00:04:00Z");
  expect(nextAcceptableSubmissionTime(timestamps)).toStrictEqual(expectedTime);
});

test("five guesses with the first three a lot longer ago than the last two only pushes to one minute past most recent", () => {
  const timestamps = [
    new Date("2024-01-01T00:00:00Z"),
    new Date("2024-01-01T00:00:00Z"),
    new Date("2024-01-01T00:01:00Z"),
    new Date("2024-01-03T00:00:00Z"),
    new Date("2024-01-03T00:00:00Z"),
  ];
  const expectedTime = new Date("2024-01-03T00:01:00Z");
  expect(nextAcceptableSubmissionTime(timestamps)).toStrictEqual(expectedTime);
});

test("queueing maximum rate guesses is capped at N per N^2 minutes", () => {
  const start = new Date("2024-01-01T00:00:00Z");
  const timestamps = [start, start];
  for (let i = 0; i < 30; i++) {
    const nextAcceptable = nextAcceptableSubmissionTime(timestamps);
    const expectedNext = new Date(start.getTime() + (i + 1) * (i + 1) * 60000);
    expect(nextAcceptable).toStrictEqual(expectedNext);
    timestamps.push(nextAcceptable);
  }
});
