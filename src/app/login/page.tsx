"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, ArrowLeft } from "lucide-react";
import useStore from "@/hooks/use-store";
import Logo from "@/components/logo";

export default function LoginPage() {
  const router = useRouter();
  const { setUserRole } = useStore();

  const handleLogin = (role: "admin" | "seller") => {
    setUserRole(role);
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/seller/sales");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-200 p-4">
        <Link href="/" className="flex items-center gap-4 mb-8">
            <Logo className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold font-headline">Bienvenue chez PajoPharma</h1>
        </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Choisir votre rôle</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleLogin("admin")}
          >
            <Shield className="mr-2 h-5 w-5" />
            Se connecter en tant qu'administrateur
          </Button>
          <Button
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => handleLogin("seller")}
          >
            <User className="mr-2 h-5 w-5" />
            Se connecter en tant que vendeur
          </Button>
        </CardContent>
         <CardFooter>
            <Button variant="destructive" className="w-full" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}