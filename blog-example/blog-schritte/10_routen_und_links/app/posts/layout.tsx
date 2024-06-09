import { ReactNode } from "react";
import BlogPageLayout from "@/app/shared/material/BlogPageLayout.tsx";

type BlogLayoutProps = {
  children: ReactNode;
};
export default function BlogLayout({ children }: BlogLayoutProps) {
  return <BlogPageLayout>{children}</BlogPageLayout>;
}
