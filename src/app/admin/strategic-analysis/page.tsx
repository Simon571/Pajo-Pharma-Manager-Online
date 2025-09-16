"use client";

import useStore from "@/hooks/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { useMemo } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function StrategicAnalysisPage() {
  const { sales, medicines } = useStore();

  const byDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sales) {
      const key = format(new Date(s.date), "yyyy-MM-dd", { locale: fr });
      map.set(key, (map.get(key) ?? 0) + s.total);
    }
    return Array.from(map.entries())
      .sort((a,b) => a[0].localeCompare(b[0]))
      .map(([date, total]) => ({ date: date.slice(5), total }));
  }, [sales]);

  const kpis = useMemo(() => {
    const revenue = sales.reduce((a, s) => a + s.total, 0);
    const avg = sales.length ? revenue / sales.length : 0;
    const low = medicines.filter(m => (m.stock ?? 0) > 0 && (m.stock ?? 0) <= (m.min ?? 0)).length;
    const out = medicines.filter(m => (m.stock ?? 0) === 0).length;
    return { revenue, avg, low, out };
  }, [sales, medicines]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Analyse stratégique</h1>
        <p className="text-sm text-muted-foreground">Tendances des ventes et indicateurs d’inventaire.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader><CardTitle>Revenu cumulé</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{kpis.revenue.toFixed(0)} CDF</CardContent></Card>
        <Card><CardHeader><CardTitle>Panier moyen</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{kpis.avg.toFixed(1)} CDF</CardContent></Card>
        <Card><CardHeader><CardTitle>Faible stock</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{kpis.low}</CardContent></Card>
        <Card><CardHeader><CardTitle>Ruptures</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{kpis.out}</CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Ventes par jour</CardTitle></CardHeader>
        <CardContent className="pl-2">
          <ChartContainer className="min-h-[240px] w-full">
            <LineChart width={600} height={240} data={byDay}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis />
              <Tooltip content={({ label, payload }) => <ChartTooltipContent label={label} payload={payload as any} />} />
              <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Répartition récente (barres)</CardTitle></CardHeader>
        <CardContent className="pl-2">
          <ChartContainer className="min-h-[240px] w-full">
            <BarChart width={600} height={240} data={byDay.slice(-10)}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis />
              <Tooltip content={({ label, payload }) => <ChartTooltipContent label={label} payload={payload as any} />} />
              <Bar dataKey="total" fill="hsl(var(--chart-3))" radius={[6,6,0,0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
