import PageHeader from "@/app/shared/components/PageHeader";
import ButtonBar from "@/app/shared/components/ButtonBar";
import PostList from "@/app/shared/material/postlistpage/PostList.tsx";
import OrderByButton from "@/app/shared/material/postlistpage/OrderByButton.tsx";
import { OrderBy } from "@/app/shared/types.ts";
import { componentLog } from "@/app/shared/component-log.ts";
import PostListOrderButtons from "@/app/shared/material/postlistpage/PostListOrderButtons.tsx";
import { fetchPosts } from "@/app/shared/blog-fetch.ts";
type PostListPageProps = {
  searchParams: {
    order_by?: "asc" | "desc";
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
