import AppLink from "@/app/components/AppLink.tsx";

export default function LandingPage() {
  return (
    <div className={"LandingPage"}>
      <h1>Welcome to our Blog!</h1>

      <AppLink className={"Button"} href={"/posts"}>
        Let's start reading!
      </AppLink>
    </div>
  );
}
