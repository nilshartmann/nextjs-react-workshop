type CPageProps = {
  searchParams: {
    name: string;
  };
};

export default function CPage({ searchParams }: CPageProps) {
  if (searchParams.name) {
    throw new Error("Schade");
  }
  return (
    <main>
      <h1>C !</h1>
    </main>
  );
}
