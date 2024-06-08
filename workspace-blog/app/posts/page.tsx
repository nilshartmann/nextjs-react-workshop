import PageHeader from "@/app/components/PageHeader";
import ButtonBar from "@/app/components/ButtonBar";
import PostList from "@/app/posts/PostList";
import OrderByButton from "@/app/posts/OrderByButton";
import { OrderBy } from "@/app/types";
import { componentLog } from "@/app/component-log";
type PostListPageProps = {
  searchParams: {
    order_by: "date_asc" | "date_desc";
  };
};

export default function PostListPage({ searchParams }: PostListPageProps) {
  componentLog("PostListPage", { searchParams });
  const orderBy = searchParams.order_by as OrderBy;
  return (
    <div className={"Page"}>
      <div className={"Main"}>
        <ButtonBar>
          <OrderByButton orderBy={"desc"} />
          <OrderByButton orderBy={"asc"} />
        </ButtonBar>
        <PostList orderBy={orderBy} />
      </div>
    </div>
  );
}
