"use server";

import { redirect } from "next/navigation";
import { saveNewPostToBackend } from "@/app/shared/blog-fetch.ts";

export type PostEditorFormState = {
  error?: string | null;
  title?: string;
  body?: string;
};

export async function saveNewBlogPost(
  prevForm: PostEditorFormState,
  form: FormData,
) {
  console.log("prevForm", prevForm);
  const title = form.get("title") as string;
  const body = form.get("body") as string;

  // Fehler simulieren
  if (title.includes("gehtnicht")) {
    return { error: "Ungültiger Titel", title, body };
  }

  await saveNewPostToBackend(title, body);

  redirect("/posts");
}
