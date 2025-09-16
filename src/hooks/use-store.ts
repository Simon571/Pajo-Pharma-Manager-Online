"use client";
import { useState } from "react";

export type Sale = { id: string; items: number; total: number; date: string };
export type Medicine = { id: string; name: string; stock: number; min: number };

const initialSales: Sale[] = [
  { id: "S-0001", items: 3, total: 24, date: new Date().toISOString() },
  { id: "S-0002", items: 1, total: 8,  date: new Date(Date.now()-86400000).toISOString() },
  { id: "S-0003", items: 5, total: 52, date: new Date(Date.now()-2*86400000).toISOString() }
];
const initialMedicines: Medicine[] = [
  { id: "M-001", name: "Paracetamol", stock: 80, min: 20 },
  { id: "M-002", name: "Amoxicilline", stock: 9, min: 15 },
  { id: "M-003", name: "Ibuprofène", stock: 0, min: 10 }
];

let globalRole: "admin" | "seller" | null = null;

export default function useStore() {
  const [sales] = useState<Sale[]>(initialSales);
  const [medicines] = useState<Medicine[]>(initialMedicines);
  const setUserRole = (r: "admin" | "seller" | null) => { globalRole = r; };
  const userRole = globalRole;
  return { userRole, setUserRole, sales, medicines };
}
