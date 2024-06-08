import { ReactNode } from "react";
import PageHeader from "@/app/components/PageHeader.tsx";
import PageHeaderButton from "@/app/material/PageHeaderButton.tsx";
import AppLink from "@/app/components/AppLink.tsx";

type BlogPageLayoutProps = {
  children: ReactNode;
};
export default function BlogPageLayout({ children }: BlogPageLayoutProps) {
  return (
    <main>
      <PageHeader button={<PageHeaderButton />}>
        <AppLink className={"PageHeaderLink"} href={"/posts"}>
          Next.JS Blog Example
        </AppLink>
      </PageHeader>

      <div className={"Main"}>{children}</div>
    </main>
  );
}
