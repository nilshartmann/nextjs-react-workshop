import { z } from "zod";

const ResponseMetaData = z.object({
  receivedAt: z.string(),
  requestId: z.string(),
  path: z.string(),
});
//
// export type IResponseMetaData = {
//   /** when did the CLIENT sent the request? */
//   sentAt: string;
//   /** when did the SERVER receive the request? */
//   receivedAt: string;
//   timeout?: string;
//   cacheMaxAge?: string;
//   requestId: string;
//   path: string;
// };

export type INewBlogPost = {
  title: string;
  body: string;
};

const CommentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  comment: z.string(),
});

const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.string().nullish(),
  date: z.string(),
  body: z.string(),
  likes: z.number(),

  newestComment: CommentSchema.nullish(),
});

export type IBlogPostSchema = z.infer<typeof BlogPostSchema>;
export type OrderBy = "asc" | "desc";

export const GetPostsResponse = z.object({
  meta: ResponseMetaData,
  data: BlogPostSchema.array(),
});
export type IGetPostsResponse = z.infer<typeof GetPostsResponse>;

export const GetPostResponse = z.object({
  meta: ResponseMetaData,
  data: BlogPostSchema,
});
export type IGetPostResponse = z.infer<typeof GetPostResponse>;

export const GetCommentsResponse = z.object({
  meta: ResponseMetaData,
  data: CommentSchema.array(),
});
export type IGetCommentsResponse = z.infer<typeof GetCommentsResponse>;

export const NewLike = z.object({
  postId: z.string(),
  likes: z.number(),
});

export type INewLike = z.infer<typeof NewLike>;

export const PatchLikeResponse = z.object({
  meta: ResponseMetaData,
  data: NewLike,
});

export type IPatchLikeResponse = z.infer<typeof PatchLikeResponse>;
