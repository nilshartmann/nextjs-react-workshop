import AppLink from "@/app/shared/components/AppLink.tsx";

export default function PostNotFound() {
  return (
    <div>
      <h1>Blog Post not found 😢</h1>

      <p>
        You might look for <AppLink href={"/posts"}>other posts</AppLink>
      </p>
    </div>
  );
}
