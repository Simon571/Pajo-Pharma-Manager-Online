import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";
import { Bot, Package, ShoppingCart, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 animation-fade-in bg-primary text-primary-foreground">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold font-headline">PajoPharma</span>
        </Link>
        <Button asChild variant="secondary">
          <Link href="/login">
            Se connecter <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="bg-primary text-primary-foreground">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4 py-20 text-center md:px-6 md:py-32 animation-fade-in-up">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Le futur de la gestion de pharmacie est arrivé
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-lg text-primary-foreground/80">
                PajoPharma est un système complet pour gérer votre stock, accélérer vos ventes et optimiser vos commandes grâce à l'intelligence artificielle.
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform duration-300 hover:scale-105">
              <Link href="/login">Commencez maintenant</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1 text-center animation-fade-in-up" style={{ animationDelay: '200ms' }}>
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Package className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Gestion de stock simplifiée</h3>
                <p className="text-sm text-muted-foreground">
                  Suivez votre inventaire en temps réel, ajoutez de nouveaux produits et gérez les dates d'expiration sans effort.
                </p>
              </div>
              <div className="grid gap-1 text-center animation-fade-in-up" style={{ animationDelay: '400ms' }}>
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Terminal de vente rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Un système de caisse intuitif qui gère les différents formats de vente (boîte, plaquette, unité) et génère des factures.
                </p>
              </div>
              <div className="grid gap-1 text-center animation-fade-in-up" style={{ animationDelay: '600ms' }}>
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Commandes intelligentes</h3>
                <p className="text-sm text-muted-foreground">
                  Laissez notre IA analyser vos tendances de vente pour vous suggérer les quantités optimales à commander et éviter les ruptures.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto flex items-center justify-center p-6 bg-background">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} PajoPharma. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}