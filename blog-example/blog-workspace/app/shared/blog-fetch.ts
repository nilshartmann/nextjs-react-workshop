import { componentLog } from "@/app/shared/component-log.ts";
import {
  GetCommentsResponse,
  GetPostResponse,
  GetPostsResponse,
  IGetCommentsResponse,
  IGetPostResponse,
  IGetPostsResponse,
  INewLike,
  OrderBy,
  PatchLikeResponse,
} from "@/app/shared/types.ts";
import { apiUrl } from "@/app/shared/api-url.ts";
import {
  delayLikePost,
  delayPostComments,
  delayPostList,
  delayPostPage,
  delaySavePost,
  failCommentsPostRequestForId,
  failPostRequestForId,
} from "@/app/shared/demo-config.ts";

export async function fetchPost(postId: string): Promise<IGetPostResponse> {
  const shouldFail = failPostRequestForId
    ? postId === failPostRequestForId
      ? true
      : undefined
    : undefined;

  const response = await blogFetch(
    apiUrl(`/posts/${postId}`, { slowdown: delayPostPage, fail: shouldFail }),
    {
      next: {
        tags: [`/posts/${postId}`],
      },
    },
  );
  const data = await response.json();

  const posts = GetPostResponse.parse(data);

  return posts;
}

export async function fetchPosts(
  orderBy?: OrderBy,
): Promise<IGetPostsResponse> {
  const response = await blogFetch(
    apiUrl("/posts", { order_by: orderBy, slowdown: delayPostList }),
    {
      next: {
        tags: ["/posts"],
      },
    },
  );

  const data = await response.json();

  const post = GetPostsResponse.parse(data);
  return post;
}

export async function fetchComments(
  postId: string,
): Promise<IGetCommentsResponse> {
  const shouldFail = failCommentsPostRequestForId
    ? postId === failCommentsPostRequestForId
      ? true
      : undefined
    : undefined;

  const response = await blogFetch(
    apiUrl(`/posts/${postId}/comments`, {
      slowdown: delayPostComments,
      fail: shouldFail,
    }),
    {
      next: {
        tags: [`/posts/${postId}/comments`],
      },
    },
  );
  const data = await response.json();

  const comments = GetCommentsResponse.parse(data);
  return comments;
}

export async function saveNewPost(title: string, body: string) {
  const response = await blogFetch(
    apiUrl(`/posts`, { slowdown: delaySavePost }),
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ body, title }),
    },
  );

  if (response.ok) {
    return {};
  }

  const responseBody = await response.json();
  console.log("save Post failed", response.status, body);
  return { error: responseBody.error ?? "Could not save post" };
}

export async function saveLikeToBackend(postId: string): Promise<INewLike> {
  const response = await blogFetch(
    apiUrl(`/posts/${postId}/likes`, { slowdown: delayLikePost }),
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    },
  );

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch (e) {
      console.warn("Could not read body from response - ignoring");
    }
    console.error("Liking failed", response.status, body);
    throw new Error("Liking failed! " + response.status);
  }

  const responseBody = await response.json();

  const likeResponse = PatchLikeResponse.parse(responseBody);

  return likeResponse.data;
}

/**
 * simple wrapper around fetch, just for logging
 */
async function blogFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const method = init?.method || "GET";
  componentLog("blogFetch", `${method} Request start to`, { input });

  const response = fetch(input, init);

  return response;
}
