import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex flex-wrap gap-4">
      <Link href="/" className="hover:text-blue-400">
        Accueil
      </Link>

      <Link href="/chain-info" className="hover:text-blue-400">
        Blockchain
      </Link>

      <Link href="/send-tx" className="hover:text-blue-400">
        Transaction
      </Link>

      <Link href="/token-data" className="hover:text-blue-400">
        Données USDT
      </Link>
    </nav>
  );
}