"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "@/hooks/use-store";
import type { Medicine } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { allMedicinesList } from "./page-data";
import { Loader2 } from "lucide-react";

type CatalogItem = typeof allMedicinesList[number];

export default function ConfigureInventoryPage() {
  // Stockera les noms sélectionnés (clé = name)
  const [selectedConfig, setSelectedConfig] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);
  const { toast } = useToast();
  const { addMedicinesFromCatalog } = useStore();

  // Hydratation: lire l'ancienne sélection depuis localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("inventoryConfigSelection");
      if (raw) setSelectedConfig(new Set(JSON.parse(raw) as string[]));
    } catch {}
    setIsHydrated(true);
  }, []);

  // Persister automatiquement
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("inventoryConfigSelection", JSON.stringify([...selectedConfig]));
  }, [selectedConfig, isHydrated]);

  const handleToggle = useCallback((medicineName: string) => {
    const newSelection = new Set(selectedConfig);
    if (newSelection.has(medicineName)) {
      newSelection.delete(medicineName);
    } else {
      newSelection.add(medicineName);
    }
    setSelectedConfig(newSelection);
    toast({
      title: "Configuration mise à jour",
      description: `${newSelection.size} produit(s) sont marqués pour la gestion.`,
      className: "bg-green-100 text-green-800"
    });
  }, [selectedConfig, toast]);

  const handleToggleCategory = useCallback((categoryMedicines: CatalogItem[]) => {
    const categoryMedicineNames = categoryMedicines.map((m) => m.name);
    const newSelection = new Set(selectedConfig);
    const shouldSelect = categoryMedicineNames.some((name) => !newSelection.has(name));

    if (shouldSelect) {
      categoryMedicineNames.forEach((name) => newSelection.add(name));
    } else {
      categoryMedicineNames.forEach((name) => newSelection.delete(name));
    }

    setSelectedConfig(newSelection);
    toast({
      title: "Configuration mise à jour",
      description: `${newSelection.size} produit(s) sont marqués pour la gestion.`,
      className: "bg-green-100 text-green-800"
    });
  }, [selectedConfig, toast]);

  // Regrouper par catégories (selon unit/form/name comme sur tes captures)
  const medicineCategoriesConfig: { title: string; medicines: CatalogItem[] }[] = useMemo(() => ([
    {
      title: "Comprimés 💊",
      medicines: allMedicinesList.filter(m => m.unit === "Comprimé"),
    },
    {
      title: "Gélules & Capsules Molles",
      medicines: allMedicinesList.filter(m => m.unit === "Gélule"),
    },
    {
      title: "Sachets & Poudres",
      medicines: allMedicinesList.filter(m => m.form === "Poudre" || /Sachet/i.test(m.unit)),
    },
    {
      title: "Liquides / Sirops 🧴",
      medicines: allMedicinesList.filter(m => m.form === "Sirop" || m.form === "Solution" || /Sirop/i.test(m.unit)),
    },
    {
      title: "Crèmes / Pommades / Gels",
      medicines: allMedicinesList.filter(m => m.form === "Crème" || m.form === "Pommade" || m.form === "Gel"),
    },
    {
      title: "Injectables 💉",
      medicines: allMedicinesList.filter(m => m.form === "Injectable"),
    },
    {
      title: "Ophtalmologie & ORL 👁️👂",
      medicines: allMedicinesList.filter(m => m.form === "Collyre" || /ORL|Ophtalmo|Collyre/i.test(m.category + " " + m.name)),
    },
    {
      title: "Produits divers de pharmacie",
      medicines: allMedicinesList.filter(m =>
        !["Comprimé", "Gélule"].includes(m.unit) &&
        !["Poudre","Sirop","Solution","Crème","Pommade","Gel","Injectable","Collyre"].includes(m.form)
      ),
    },
  ]), []);

  // Pour loader initial (comme ta capture avec Loader2)
  if (!isHydrated) {
    return (
      <div className="flex flex-col gap-6 h-full items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h1 className="text-xl font-headline">Chargement…</h1>
      </div>
    );
  }

  // Bouton: ajouter à l'inventaire (selon sélection)
  const addSelectedToInventory = () => {
    const selected = allMedicinesList.filter(m => selectedConfig.has(m.name));
    if (!selected.length) {
      toast({ title: "Aucun produit sélectionné", description: "Coche au moins un produit avant d'ajouter." });
      return;
    }
    addMedicinesFromCatalog(selected as any as Omit<Medicine,"id"|"stock">[]);
    toast({ title: "Ajout effectué", description: `${selected.length} produit(s) envoyé(s) vers l’inventaire.` });
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <header>
        <h1 className="text-3xl font-bold font-headline">Configuration des stocks</h1>
        <p className="text-muted-foreground">
          Cochez les produits à gérer. La sauvegarde est automatique.
        </p>
      </header>

      <div className="space-y-6 flex-1 overflow-auto pb-8">
        {medicineCategoriesConfig.map(({ title, medicines }) => {
          const categoryNames = medicines.map(m => m.name);
          const allSelected = categoryNames.every(n => selectedConfig.has(n));
          const someSelected = !allSelected && categoryNames.some(n => selectedConfig.has(n));

          return (
            <Card key={title}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{medicines.length} produit(s)</CardDescription>
                </div>
                <label className="flex items-center gap-2">
                  <Checkbox
                    id={`select-all-${title}`}
                    checked={allSelected ? true : (someSelected ? "indeterminate" as any : false)}
                    onCheckedChange={() => handleToggleCategory(medicines)}
                  />
                  <span className="text-sm font-medium leading-none">Tout sélectionner</span>
                </label>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {medicines.map((med) => (
                    <div key={med.name} className="flex items-start space-x-2 p-2 rounded hover:bg-muted/40">
                      <Checkbox
                        id={med.name}
                        checked={selectedConfig.has(med.name)}
                        onCheckedChange={() => handleToggle(med.name)}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label htmlFor={med.name} className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {med.name}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {med.form} • {med.unit} • {med.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Rendez-vous sur la page <span className="font-bold">/admin/inventory</span> pour voir et modifier votre stock.
      </p>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setSelectedConfig(new Set())}
          className="h-10 rounded-md border px-4 text-sm hover:bg-muted"
        >
          Tout décocher
        </button>
        <button
          onClick={addSelectedToInventory}
          className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:opacity-90"
        >
          Ajouter à l’inventaire
        </button>
      </div>
    </div>
  );
}
