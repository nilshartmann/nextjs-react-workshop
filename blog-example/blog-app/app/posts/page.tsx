import PageHeader from "@/app/components/PageHeader";
import ButtonBar from "@/app/components/ButtonBar";
import PostList from "@/app/material/postlistpage/PostList.tsx";
import OrderByButton from "@/app/material/postlistpage/OrderByButton.tsx";
import { OrderBy } from "@/app/shared/types.ts";
import { componentLog } from "@/app/shared/component-log.ts";
import PostListOrderButtons from "@/app/material/postlistpage/PostListOrderButtons.tsx";
import { fetchPosts } from "@/app/shared/blog-fetch.ts";
type PostListPageProps = {
  searchParams: {
    order_by: "asc" | "desc";
  };
};

export default async function PostListPage({
  searchParams,
}: PostListPageProps) {
  componentLog("PostListPage", { searchParams });
  const orderBy = searchParams.order_by;
  const postsPromise = fetchPosts(orderBy);
  return (
    <>
      <PostListOrderButtons />
      <PostList postsPromise={postsPromise} />
    </>
  );
}
