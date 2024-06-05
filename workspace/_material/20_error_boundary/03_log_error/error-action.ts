"use server";

import { headers } from "next/headers";

export async function logError(msg: string) {
  const h = headers();
  console.error("🚨 Im Client ist ein Fehler aufgetreten", msg);
  console.error("🚨    Client Browser:", h.get("User-Agent"));
}
