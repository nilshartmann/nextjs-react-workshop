import { componentLog } from "@/app/shared/component-log.ts";
import {
  GetCommentsResponse,
  GetPostResponse,
  GetPostsResponse,
  IGetCommentsResponse,
  IGetPostResponse,
  IGetPostsResponse,
  OrderBy,
} from "@/app/shared/types.ts";
import { apiUrl } from "@/app/shared/api-url.ts";
import {
  delayPostComments,
  delayPostList,
  delayPostPage,
  delaySavePost,
} from "@/app/shared/demo-config.ts";

export async function fetchPost(postId: string): Promise<IGetPostResponse> {
  const response = await blogFetch(
    apiUrl(`/posts/${postId}`, { slow: delayPostPage }),
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
    apiUrl("/posts", { order_by: orderBy, slow: delayPostList }),
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
  const response = await blogFetch(
    apiUrl(`/posts/${postId}/comments`, { slow: delayPostComments }),
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
  const response = await blogFetch(apiUrl(`/posts`, { slow: delaySavePost }), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ body, title }),
  });

  if (response.ok) {
    return {};
  }

  const responseBody = await response.json();
  console.log("save Post failed", response.status, body);
  return { error: responseBody.error ?? "Could not save post" };
}

/**
 * simple wrapper around fetch, just for logging
 */
async function blogFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  componentLog("blogFetch", "Request start to", { input });

  // for demo purposes disable fetch cache at all

  const response = fetch(input, init);

  return response;
}
