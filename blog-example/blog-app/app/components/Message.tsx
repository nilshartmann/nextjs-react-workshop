type MessageProps = {
  msg: string;
  type?: "error" | "info";
};
export default function Message({ msg, type = "error" }: MessageProps) {
  const style =
    type === "error"
      ? { color: "red", fontWeight: "bold" }
      : { color: "green" };

  return <p style={style}>{msg}</p>;
}
