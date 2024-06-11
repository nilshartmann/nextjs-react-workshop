type HelloMessageProps = {
  msg: string;
};

export default function HelloMessage({ msg }: HelloMessageProps) {
  return <h1>Message: {msg}</h1>;
}
