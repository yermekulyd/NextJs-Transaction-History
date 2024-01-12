import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Didar's Test Task</h1>
      <p className="text-xl mb-4">Explore your Transaction History</p>
      <Link
        href="/transactions"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
      >
        View Transactions
      </Link>
    </main>
  );
}
