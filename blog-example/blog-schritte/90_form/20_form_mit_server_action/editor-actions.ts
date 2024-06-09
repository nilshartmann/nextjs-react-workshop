"use server";

import { redirect } from "next/navigation";
import { saveNewPostToBackend } from "@/app/shared/blog-fetch.ts";

export async function saveNewBlogPost(form: FormData) {
  const title = form.get("title") as string;
  const body = form.get("body") as string;

  // Fehler simulieren
  if (title.includes("gehtnicht")) {
    return { error: "Ungültiger Titel" };
  }

  await saveNewPostToBackend(title, body);

  redirect("/posts");
}
