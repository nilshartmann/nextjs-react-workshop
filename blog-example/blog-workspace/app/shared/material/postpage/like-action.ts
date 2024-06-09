"use server";

import { saveLikeToBackend } from "@/app/shared/blog-fetch.ts";

export async function increaseLikes(postId: string): Promise<number> {
  const response = await saveLikeToBackend(postId);

  return response.likes;
}
