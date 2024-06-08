import express, { Express, Request, Response } from "express";
import { createPostsData } from "./post-data";
import { createCommentsData } from "./comments-data";
import { createUserData } from "./user-data";

let posts = createPostsData();
let comments = createCommentsData();
let users = createUserData();

let requestCounter = 0;

type SortableByDate = {
  date: string;
};

const orderByDateNewestFirst = (p1: SortableByDate, p2: SortableByDate) =>
  Date.parse(p2.date) - Date.parse(p1.date);
const orderByDateOldestFirst = (p1: SortableByDate, p2: SortableByDate) =>
  Date.parse(p1.date) - Date.parse(p2.date);

const port = process.env.PORT || 7000;

const app: Express = express();

app.set("etag", false);
app.use(express.json());

app.use((req, res, next) => {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    fractionalSecondDigits: 3,
  } as const;
  console.log(
    `[${now.toLocaleString("de-DE", options)}] Request received for`,
    req.method,
    req.path,
    req.params,
  );
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,PUT,POST,PATCH,DELETE",
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Credentials", "true");

  res.header("x-backend-started-at", new Date().toISOString());

  const meta: Record<string, string | number | Date> = {};
  ++requestCounter;
  meta.path = req.path;
  meta.requestId = `${requestCounter}`;
  meta.receivedAt = new Date();
  res.locals.meta = meta;

  next();
});

app.use((req, res, next) => {
  const slowdown = req.query.slowDown || req.query.slowdown;
  if (slowdown !== undefined && slowdown !== "false" && slowdown !== "0") {
    const timeout = Number(slowdown) || 1200;
    console.log(`    😴 Slow down ${timeout}ms`);
    setTimeout(next, timeout);
  } else {
    next();
  }
});

type Tag = { name: string; count: number };

app.get("/tags", (req: Request, res: Response) => {
  const tags: Tag[] = Object.values(posts)
    .flatMap((p) => p.tags.split(","))
    .map((t) => t.trim())
    .filter((tag) => !!tag) // filter out empty tags
    .reduce((tags, tag) => {
      const t = tags.find((t) => t.name === tag);
      if (!t) {
        return [...tags, { name: tag, count: 0 }];
      }
      t.count = t.count + 1;
      // const count = tags[tag] || 0;
      // tags[tag] = count + 1;
      return tags;
    }, [] as Tag[])
    .sort((t1, t2) => t1.name.localeCompare(t2.name));

  return res.status(200).json({ tags, generatedAt: new Date().toISOString() });
});

app.get("/posts/:postId", (req: Request, res: Response) => {
  const postId = req.params["postId"];

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({
      error: `Post with id '${postId}' not found`,
      meta: res.locals.meta,
    });
  }

  return res.status(200).json({ data: post, meta: res.locals.meta });
});

app.get("/posts/:postId/comments", (req: Request, res: Response) => {
  const postId = req.params["postId"];

  if (!posts.find((p) => p.id === postId)) {
    return res.status(404).json({
      error: `Post with id '${postId}' not found`,
    });
  }

  const commentsForPost = comments.filter((c) => c.postId === postId);
  return res.json({ data: commentsForPost, meta: res.locals.meta });
});

app.post("/posts/:postId/like", (req, res) => {
  const postId = req.params["postId"];

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res
      .status(404)
      .json({ error: `Post '${req.params.postId}' not found` });
  }

  // if (post.id === "P9") {
  //   // simluation: error in processing
  //   return res.status(200).json({
  //     postId: post.id,
  //     likes: "nobody likes me",
  //   });
  // }

  post.likes = post.likes + 1;
  res.status(200).json({
    data: {
      postId: post.id,
      likes: post.likes,
    },
    meta: res.locals.meta,
  });
});

function findNewestCommentForPost(postId: string) {
  for (let index = comments.length - 1; index >= 0; index--) {
    const comment = comments[index];
    if (comment.postId === postId) {
      return comment;
    }
  }
  return null;
}

app.get("/posts", (req, res) => {
  let result;

  if (req.query.teaser !== undefined) {
    result = posts.map((p) => ({
      id: p.id,
      date: p.date,
      title: p.title,
      newestComment: findNewestCommentForPost(p.id),
      teaser: p.teaser,
    }));
  } else {
    result = posts.map((p) => ({
      id: p.id,
      date: p.date,
      title: p.title,
      body: p.body,
    }));
  }

  const filter = req.query.filter
    ? String(req.query.filter).toLowerCase()
    : null;

  if (filter) {
    result = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(filter) ||
        p.teaser.toLowerCase().includes(filter) ||
        p.body.toLowerCase().includes(filter),
    );
  }

  if (req.query.order_by === "asc") {
    result.sort(orderByDateOldestFirst);
  } else {
    result.sort(orderByDateNewestFirst);
  }

  res.status(200).json({ data: result, meta: res.locals.meta });
});

app.post("/posts/:postId/comments", (req, res) => {
  const postId = req.params["postId"];

  if (!posts.find((p) => p.id === postId)) {
    return res.status(404).json({
      error: `Post with id '${postId}' not found`,
    });
  }

  const comment = req.body.comment;
  if (!comment) {
    return res.status(400).json({ error: "comment must be defined" });
  }

  const newComment = {
    username: "Dave",
    comment,
    postId,
    id: `P${comments.length + 1}`,
  };

  comments = [...comments, newComment];

  res.status(201).json(newComment);
});

app.post("/posts", (req, res) => {
  const post = req.body as { title: string; body: string };
  if (!post) {
    return res.status(400).json({ error: "Post must be defined" });
  }

  if (!post.title) {
    return res
      .status(400)
      .json({ error: "post.title must be defined and not empty" });
  }

  if (post.title.trim().length < 5) {
    return res
      .status(400)
      .json({ error: "post.title must be at least five chars long" });
  }

  if (!post.body) {
    return res
      .status(400)
      .json({ error: "post.body must be defined and not empty" });
  }

  const newPost = {
    userId: "",
    title: post.title,
    teaser:
      post.body.length > 120 ? post.body.substring(0, 120) + "..." : post.body,
    body: post.body,
    date: new Date().toISOString(),
    id: `P${posts.length + 1}`,
    likes: 0,
    tags: "",
  };

  posts = [...posts, newPost];

  res.status(201).json(newPost);
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = users[userId];
  if (!user) {
    return res.status(404).json({
      error: `User '${userId}' not found.`,
    });
  }

  res.status(200).json(user);
});

app.listen(port, () => {
  console.log(`
    📞    Blog API Server listening on port ${port}
    👉    Try http://localhost:${port}/posts
    👉    Try http://localhost:${port}/posts/P1
    👉    Try http://localhost:${port}/posts/P3/comments
    👉    Try http://localhost:${port}/posts?teaser
    👉    Try http://localhost:${port}/posts?teaser&filter=redux
    👉    Try http://localhost:${port}/users/U1
    👉    Try "http POST http://localhost:7002/posts title=hallo body=welt"
    👉    Try "http POST http://localhost:7002/posts/P1/comments comment=moin"
    😴    Simulate slowness: http://localhost:${port}/posts?slowDown=2400`);
});
