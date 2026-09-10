import { randomUUID } from "node:crypto";

const TIME_LOCALE = "en-US" as const;

const TIME_FORMAT_OPTIONS = {
  dateStyle: "full",
  timeStyle: "long",
} as const satisfies Intl.DateTimeFormatOptions;

export type ServerTimeSnapshot = {
  iso: string;
  formatted: string;
  requestId: string;
};

export async function getCurrentServerTime(): Promise<ServerTimeSnapshot> {
  const now = new Date();
  return {
    iso: now.toISOString(),
    formatted: new Intl.DateTimeFormat(TIME_LOCALE, TIME_FORMAT_OPTIONS).format(
      now,
    ),
    requestId: randomUUID(),
  };
}
