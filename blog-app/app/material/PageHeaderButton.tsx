"use client";

import { usePathname, useRouter } from "next/navigation";
import AppLink from "@/app/components/AppLink.tsx";

export default function PageHeaderButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/posts/add")) {
    return null;
  }

  return (
    <AppLink className={"Button"} href={"/posts/add"}>
      New Blog Post
    </AppLink>
  );
}
