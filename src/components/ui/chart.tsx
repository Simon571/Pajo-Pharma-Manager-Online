import * as React from "react";

export function ChartContainer({ className, children }:{ className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

export function ChartTooltipContent({ label, payload }:{ label?: string; payload?: any[] }) {
  if (!payload?.length) return null;
  return (
    <div className="rounded-md border bg-card p-2 text-sm shadow">
      {label ? <div className="mb-1 font-medium">{label}</div> : null}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{background:p.color}} />
          <span>{p.name}: </span>
          <span className="font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
