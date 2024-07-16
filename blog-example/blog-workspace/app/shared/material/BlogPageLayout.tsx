import { ReactNode } from "react";
import PageHeader from "@/app/shared/components/PageHeader.tsx";
import PageHeaderButton from "@/app/shared/material/PageHeaderButton.tsx";
import AppLink from "@/app/shared/components/AppLink.tsx";

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

        {/*<AppLink className={"PageHeaderLink"} href={"/context"}>*/}
        {/*  Zum Context!*/}
        {/*</AppLink>*/}
      </PageHeader>

      <div className={"Main"}>{children}</div>
    </main>
  );
}
