import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Asadal Pay Test Task</h1>
      <Link href="/transactions">Transactions</Link>
    </main>
  );
}
