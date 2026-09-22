"use client";

import Link from "next/link";
import { formatUnits } from "viem";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
} from "wagmi";
import { injected } from "wagmi/connectors";
import Navigation from "./Navigation";

export default function Header() {
  // Informations sur le wallet connecté
  const { address, isConnected } = useAccount();

  // Connexion avec MetaMask
  const { connect, isPending } = useConnect();

  // Déconnexion du wallet
  const { disconnect } = useDisconnect();

  // Solde ETH de l'adresse connectée
  const { data: balance } = useBalance({
    address,
    query: {
      enabled: Boolean(address),
    },
  });

  // Convertit le solde dans son unité normale
  const formattedBalance = balance
    ? Number(
        formatUnits(balance.value, balance.decimals)
      ).toFixed(4)
    : "0.0000";

  return (
    <header className="border-b p-5">
      <div className="flex flex-wrap items-center justify-between gap-6">
        {/* Le titre permet également de revenir à l'accueil */}
        <Link href="/" className="text-xl font-bold">
          UX Indexer
        </Link>

        {/* Menu de navigation */}
        <Navigation />

        {/* Partie wallet */}
        {isConnected ? (
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm">{address}</p>

              <p className="font-semibold">
                {formattedBalance} {balance?.symbol ?? "ETH"}
              </p>
            </div>

            <button
              onClick={() => disconnect()}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Déconnecter
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              connect({
                connector: injected(),
              })
            }
            disabled={isPending}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Connexion..." : "Connecter MetaMask"}
          </button>
        )}
      </div>
    </header>
  );
}