"use server";

import { saveNewPostToBackend } from "@/app/shared/blog-fetch.ts";

export async function saveNewBlogPost(title: string, body: string) {
  // Fehler simulieren
  if (title.includes("gehtnicht")) {
    return { error: "Ungültiger Titel", title, body };
  }

  await saveNewPostToBackend(title, body);
}
