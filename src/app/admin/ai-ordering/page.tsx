"use client";

import useStore from "@/hooks/use-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Suggestion = { id: string; name: string; current: number; min: number; target: number; orderQty: number };

export default function AiOrderingPage() {
  const { medicines, setMedicineStock } = useStore();
  const suggestions: Suggestion[] = medicines.map(m => {
    const current = Number(m.stock ?? 0);
    const min = Number(m.min ?? 10);
    const target = Math.max(min * 2, 20);       // stratégie simple: viser 2×min, au moins 20
    const orderQty = Math.max(0, target - current);
    return { id: m.id, name: m.name, current, min, target, orderQty };
  }).filter(s => s.orderQty > 0);

  const applyAll = () => {
    // Application “naïve” : on ajoute la quantité commandée au stock
    suggestions.forEach(s => setMedicineStock(s.id, s.current + s.orderQty));
    alert(`Commandes appliquées: ${suggestions.length} article(s) mis à niveau.`);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Commandes intelligentes (simple)</h1>
        <p className="text-sm text-muted-foreground">Suggestions basées sur min et un stock cible = max(2×min, 20).</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Suggestions</CardTitle>
          <CardDescription>{suggestions.length} article(s) à recommander</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead className="text-right">Actuel</TableHead>
                <TableHead className="text-right">Seuil min</TableHead>
                <TableHead className="text-right">Cible</TableHead>
                <TableHead className="text-right">À commander</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suggestions.length ? suggestions.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-right">{s.current}</TableCell>
                  <TableCell className="text-right">{s.min}</TableCell>
                  <TableCell className="text-right">{s.target}</TableCell>
                  <TableCell className="text-right">{s.orderQty}</TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={5} className="text-center h-20">Aucune recommandation.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-end">
            <Button onClick={applyAll} disabled={!suggestions.length}>Appliquer toutes les commandes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
