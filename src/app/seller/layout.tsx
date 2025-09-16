"use client";

import Link from "next/link";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen">
      <header className="flex items-center justify-between border-b p-4">
        <div className="font-semibold">Espace Vendeur</div>
        <nav className="flex items-center gap-2">
          <Link href="/" className="text-sm underline">Accueil</Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </section>
  );
}
