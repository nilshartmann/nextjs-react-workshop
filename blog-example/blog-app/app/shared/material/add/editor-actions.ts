"use server";

import { redirect } from "next/navigation";
import { saveNewPostToBackend } from "@/app/shared/blog-fetch.ts";
import { INewBlogPost } from "@/app/shared/types.ts";

export async function saveNewBlogPost({ title, body }: INewBlogPost) {
  // Fehler simulieren
  if (title.includes("gehtnicht")) {
    throw new Error("Ungueltiger Titel");
  }

  await saveNewPostToBackend(title, body);

  redirect("/posts");
}
