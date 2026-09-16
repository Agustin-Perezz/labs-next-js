import { randomUUID } from "node:crypto";

import { connection } from "next/server";

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
  // Opt out of prerendering: this must run on every request so each response
  // carries a fresh timestamp and request id.
  await connection();
  const now = new Date();
  return {
    iso: now.toISOString(),
    formatted: new Intl.DateTimeFormat(TIME_LOCALE, TIME_FORMAT_OPTIONS).format(
      now,
    ),
    requestId: randomUUID(),
  };
}
