import { ReactNode } from "react";
import PageHeader from "@/app/components/PageHeader.tsx";
import AppLink from "@/app/components/AppLink.tsx";
import ButtonBar from "@/app/components/ButtonBar.tsx";
import OrderByButton from "@/app/posts/OrderByButton.tsx";
import PostList from "@/app/posts/PostList.tsx";
import PageHeaderButton from "@/app/posts/PageHeaderButton.tsx";

type BlogLayoutProps = {
  children: ReactNode;
};
export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <main>
      <PageHeader button={<PageHeaderButton />}>
        <AppLink className={"PageHeaderLink"} href={"/posts"}>
          Next.JS Blog Example
        </AppLink>
      </PageHeader>

      {children}
    </main>
  );
}
