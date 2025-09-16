"use client";

import { useState, useMemo } from "react";
import useStore from "@/hooks/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function SellerSalesPage() {
  const { sales, addSale } = useStore();
  const [items, setItems] = useState(1);
  const [total, setTotal] = useState(0);

  const todaySales = useMemo(
    () => sales.filter(s => new Date(s.date).toDateString() === new Date().toDateString()),
    [sales]
  );
  const todayRevenue = todaySales.reduce((a, s) => a + s.total, 0);

  const onAdd = () => {
    if (items <= 0 || total <= 0) return alert("Renseigne des valeurs positives.");
    addSale({ items, total });
    setItems(1); setTotal(0);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Ventes du jour</h1>
        <p className="text-sm text-muted-foreground">Saisie rapide des ventes et récapitulatif.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Revenu (aujourd’hui)</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{todayRevenue.toFixed(0)} CDF</CardContent></Card>
        <Card><CardHeader><CardTitle>Ventes (aujourd’hui)</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{todaySales.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Dernière vente</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{sales[0]?.total?.toFixed?.(0) ?? 0} CDF</CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Ajouter une vente</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="grid gap-1">
            <label className="text-sm">Articles</label>
            <input type="number" min="1" className="h-10 w-28 rounded-md border px-3 text-right" value={items} onChange={(e)=>setItems(Number(e.target.value||1))}/>
          </div>
          <div className="grid gap-1">
            <label className="text-sm">Total (CDF)</label>
            <input type="number" min="0" className="h-10 w-40 rounded-md border px-3 text-right" value={total} onChange={(e)=>setTotal(Number(e.target.value||0))}/>
          </div>
          <Button onClick={onAdd}>Enregistrer</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Historique récent</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.slice(0, 20).map((s)=>(
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.id}</TableCell>
                  <TableCell>{format(new Date(s.date), "PPP p", { locale: fr })}</TableCell>
                  <TableCell>{s.items}</TableCell>
                  <TableCell className="text-right">{s.total.toFixed(0)} CDF</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
