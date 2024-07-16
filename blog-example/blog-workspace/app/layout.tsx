import "./globals.css";
import Timer from "@/app/Timer.tsx";
import Uhrzeit from "@/app/Uhrzeit.tsx";
import AppLink from "@/app/shared/components/AppLink.tsx";
import NavBar from "@/app/NavBar.tsx";
import BlogPageLayout from "@/app/shared/material/BlogPageLayout.tsx";
import CounterContextProvider from "@/app/context/CounterContext.tsx";
import React from "react";

export const metadata = {
  title: "Blog Example!",
  description: "Blog Example App!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={"Root"}>
          {/*<NavBar />*/}
          {/*<Timer />*/}
          <BlogPageLayout>
            <div className={"App"}>{children}</div>
          </BlogPageLayout>

          {/*<CounterContextProvider initialValue={100}>*/}
          {/*  <BlogPageLayout>*/}
          {/*    <div className={"App"}>{children}</div>*/}
          {/*  </BlogPageLayout>*/}
          {/*</CounterContextProvider>*/}

          {/*<div>/!*<Timer />*!/</div>*/}
        </div>
      </body>
    </html>
  );
}
