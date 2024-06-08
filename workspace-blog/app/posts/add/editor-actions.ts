"use server";

import { INewBlogPost } from "@/app/types.ts";
import { saveNewPost } from "@/app/blog-fetch.ts";

export async function savePost({ body, title }: INewBlogPost) {
  if (!body) {
    throw new Error("No body!");
  }

  if (!title) {
    throw new Error("No title");
  }

  saveNewPost(title, body);
}
