import "./globals.css";

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
          <div className={"App"}>{children}</div>
        </div>
      </body>
    </html>
  );
}
