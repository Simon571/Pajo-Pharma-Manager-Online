import type { Medicine } from "@/lib/types";

export const allMedicinesList: Omit<Medicine, "id" | "stock">[] = [
  // --- ANTI-DOULEUR / ANTIPYRÉTIQUES ---
  { name: "Paracétamol 500 mg", unit: "Comprimé", form: "Comprimé", category: "Analgésique", pricing: 0, min: 20 },
  { name: "Paracétamol 1 g", unit: "Comprimé", form: "Comprimé", category: "Analgésique", pricing: 0, min: 20 },
  { name: "Ibuprofène 200 mg", unit: "Comprimé", form: "Comprimé", category: "AINS", pricing: 0, min: 15 },
  { name: "Ibuprofène 400 mg", unit: "Comprimé", form: "Comprimé", category: "AINS", pricing: 0, min: 15 },
  { name: "Aspirine 500 mg", unit: "Comprimé", form: "Comprimé", category: "AINS", pricing: 0, min: 15 },
  { name: "Diclofénac 50 mg", unit: "Comprimé", form: "Comprimé", category: "AINS", pricing: 0, min: 10 },
  { name: "Naproxène 250 mg", unit: "Comprimé", form: "Comprimé", category: "AINS", pricing: 0, min: 10 },
  { name: "Naproxène 500 mg", unit: "Comprimé", form: "Comprimé", category: "AINS", pricing: 0, min: 10 },
  { name: "Kétoprofène 50 mg", unit: "Comprimé", form: "Comprimé", category: "AINS", pricing: 0, min: 10 },
  { name: "Tramadol 50 mg", unit: "Comprimé", form: "Comprimé", category: "Antalgique palier II", pricing: 0, min: 5 },

  // --- ANTIBIOTIQUES COURANTS (usage conforme à l’ordonnance locale) ---
  { name: "Amoxicilline 500 mg", unit: "Gélule", form: "Gélule", category: "Antibiotique", pricing: 0, min: 15 },
  { name: "Amoxicilline + Acide clavulanique 500/125 mg", unit: "Comprimé", form: "Comprimé", category: "Antibiotique", pricing: 0, min: 15 },
  { name: "Ciprofloxacine 500 mg", unit: "Comprimé", form: "Comprimé", category: "Antibiotique", pricing: 0, min: 12 },
  { name: "Azithromycine 500 mg", unit: "Comprimé", form: "Comprimé", category: "Antibiotique", pricing: 0, min: 12 },
  { name: "Clarithromycine 500 mg", unit: "Comprimé", form: "Comprimé", category: "Antibiotique", pricing: 0, min: 8 },
  { name: "Cefixime 200 mg", unit: "Comprimé", form: "Comprimé", category: "Antibiotique", pricing: 0, min: 10 },
  { name: "Doxycycline 100 mg", unit: "Gélule", form: "Gélule", category: "Antibiotique", pricing: 0, min: 12 },
  { name: "Métronidazole 250 mg", unit: "Comprimé", form: "Comprimé", category: "Antibiotique/Antiprotozoaire", pricing: 0, min: 12 },
  { name: "Co-trimoxazole 800/160 mg", unit: "Comprimé", form: "Comprimé", category: "Antibiotique", pricing: 0, min: 10 },

  // --- ORL / ALLERGIES / RESPIRATOIRE ---
  { name: "Loratadine 10 mg", unit: "Comprimé", form: "Comprimé", category: "Antihistaminique", pricing: 0, min: 12 },
  { name: "Cétirizine 10 mg", unit: "Comprimé", form: "Comprimé", category: "Antihistaminique", pricing: 0, min: 12 },
  { name: "Desloratadine 5 mg", unit: "Comprimé", form: "Comprimé", category: "Antihistaminique", pricing: 0, min: 8 },
  { name: "Pseudoéphédrine + Antihistaminique", unit: "Comprimé", form: "Comprimé", category: "Rhume/Allergie", pricing: 0, min: 10 },
  { name: "Spray nasal Salin 0.9%", unit: "Spray", form: "Spray", category: "ORL", pricing: 0, min: 10 },
  { name: "Otrivine (Xylométazoline) 0.1%", unit: "Spray", form: "Spray", category: "Décongestionnant", pricing: 0, min: 8 },
  { name: "Salbutamol Inhaler 100 µg", unit: "Spray", form: "Spray", category: "Asthme/BPCO", pricing: 0, min: 8 },
  { name: "Béclométhasone Inhaler", unit: "Spray", form: "Spray", category: "Asthme/BPCO", pricing: 0, min: 6 },

  // --- DIGESTIF / GASTRO ---
  { name: "Oméprazole 20 mg", unit: "Gélule", form: "Gélule", category: "IPP", pricing: 0, min: 12 },
  { name: "Ésomprazole 20 mg", unit: "Gélule", form: "Gélule", category: "IPP", pricing: 0, min: 10 },
  { name: "Pansement gastrique (Alginate)", unit: "Suspension", form: "Solution", category: "Antiacide", pricing: 0, min: 10 },
  { name: "Dompéridone 10 mg", unit: "Comprimé", form: "Comprimé", category: "Antinauséeux", pricing: 0, min: 10 },
  { name: "Métoclopramide 10 mg", unit: "Comprimé", form: "Comprimé", category: "Antinauséeux", pricing: 0, min: 10 },
  { name: "Sels de réhydratation orale (SRO)", unit: "Sachets", form: "Poudre", category: "Réhydratation", pricing: 0, min: 20 },
  { name: "Lopéramide 2 mg", unit: "Comprimé", form: "Comprimé", category: "Antidiarrhéique", pricing: 0, min: 12 },
  { name: "Probiotiques (Lactobacillus)", unit: "Gélule", form: "Gélule", category: "Flore intestinale", pricing: 0, min: 8 },

  // --- DERMATO / SOINS ---
  { name: "Pommade antibiotique (Mupirocine)", unit: "Pommade", form: "Pommade", category: "Dermato", pricing: 0, min: 8 },
  { name: "Crème antifongique (Clotrimazole 1%)", unit: "Crème", form: "Crème", category: "Antifongique", pricing: 0, min: 10 },
  { name: "Crème hydrocortisone 1%", unit: "Crème", form: "Crème", category: "Dermato (corticoïde)", pricing: 0, min: 8 },
  { name: "Gel d’Aloe Vera", unit: "Gel", form: "Gel", category: "Soin/Apaisant", pricing: 0, min: 8 },
  { name: "Solution antiseptique (Chlorhexidine)", unit: "Solution", form: "Solution", category: "Antiseptique", pricing: 0, min: 10 },
  { name: "Pansements adhésifs (assortiment)", unit: "Boîte", form: "Autre", category: "Dispositifs médicaux", pricing: 0, min: 10 },

  // --- OPHTALMO / ORL LOCAL ---
  { name: "Collyre antibio (Chloramphénicol)", unit: "Collyre", form: "Collyre", category: "Ophtalmo", pricing: 0, min: 6 },
  { name: "Larmes artificielles", unit: "Collyre", form: "Collyre", category: "Ophtalmo", pricing: 0, min: 6 },
  { name: "Gouttes auriculaires analgésiques", unit: "Solution", form: "Solution", category: "ORL", pricing: 0, min: 6 },

  // --- ANTIPARASITAIRES / ANTIPALUDÉENS (selon pays) ---
  { name: "Albendazole 400 mg", unit: "Comprimé", form: "Comprimé", category: "Anthelminthique", pricing: 0, min: 10 },
  { name: "Mebendazole 100 mg", unit: "Comprimé", form: "Comprimé", category: "Anthelminthique", pricing: 0, min: 10 },
  { name: "Artemether/Lumefantrine 20/120 mg", unit: "Comprimé", form: "Comprimé", category: "Antipaludéen", pricing: 0, min: 12 },
  { name: "Sulfadoxine/Pyriméthamine", unit: "Comprimé", form: "Comprimé", category: "Antipaludéen", pricing: 0, min: 8 },
  { name: "Perméthrine lotion 1%", unit: "Lotion", form: "Lotion", category: "Antiparasitaire", pricing: 0, min: 6 },

  // --- DIABÈTE / CARDIO (OTC et dispositifs courants) ---
  { name: "Glucomètre (appareil)", unit: "Unité", form: "Autre", category: "Dispositifs médicaux", pricing: 0, min: 3 },
  { name: "Bandelettes glycémiques (boîte)", unit: "Boîte", form: "Autre", category: "Dispositifs médicaux", pricing: 0, min: 6 },
  { name: "Aiguilles stylo insuline (boîte)", unit: "Boîte", form: "Autre", category: "Dispositifs médicaux", pricing: 0, min: 6 },
  { name: "AAS faible dose 75–100 mg", unit: "Comprimé", form: "Comprimé", category: "Cardiovasculaire", pricing: 0, min: 10 },

  // --- VITAMINES / COMPLÉMENTS ---
  { name: "Vitamine C 500 mg", unit: "Comprimé", form: "Comprimé", category: "Vitamine", pricing: 0, min: 15 },
  { name: "Complexe multivitaminé", unit: "Comprimé", form: "Comprimé", category: "Vitamine", pricing: 0, min: 12 },
  { name: "Vitamine D3 1000 UI", unit: "Comprimé", form: "Comprimé", category: "Vitamine", pricing: 0, min: 10 },
  { name: "Zinc 15 mg", unit: "Comprimé", form: "Comprimé", category: "Complément", pricing: 0, min: 10 },
  { name: "Fer + Acide folique", unit: "Comprimé", form: "Comprimé", category: "Complément", pricing: 0, min: 10 },

  // --- PÉDIATRIE / SIROPS ---
  { name: "Paracétamol 2.4% (Sirop 120 mg/5ml)", unit: "Sirop 100 ml", form: "Sirop", category: "Pédiatrie", pricing: 0, min: 12 },
  { name: "Ibuprofène (Sirop 100 mg/5ml)", unit: "Sirop 100 ml", form: "Sirop", category: "Pédiatrie", pricing: 0, min: 10 },
  { name: "Amoxicilline (Sirop 250 mg/5ml)", unit: "Sirop 100 ml", form: "Sirop", category: "Pédiatrie", pricing: 0, min: 10 },
  { name: "Loratadine (Sirop)", unit: "Sirop 100 ml", form: "Sirop", category: "Pédiatrie", pricing: 0, min: 8 },

  // --- GYNÉCO / URO ---
  { name: "Métronidazole ovule 500 mg", unit: "Ovule", form: "Autre", category: "Gynéco", pricing: 0, min: 8 },
  { name: "Clotrimazole ovule 500 mg", unit: "Ovule", form: "Autre", category: "Gynéco", pricing: 0, min: 8 },
  { name: "Acide folique 5 mg", unit: "Comprimé", form: "Comprimé", category: "Gynéco", pricing: 0, min: 10 },

  // --- AUTRES COURANTS ---
  { name: "Sérum physiologique 0.9% 10 ml", unit: "Dosettes", form: "Solution", category: "Soins", pricing: 0, min: 10 },
  { name: "Thermomètre digital", unit: "Unité", form: "Autre", category: "Dispositifs médicaux", pricing: 0, min: 3 },
  { name: "Masques chirurgicaux (boîte)", unit: "Boîte", form: "Autre", category: "Protection", pricing: 0, min: 5 },
  { name: "Gel hydroalcoolique 100 ml", unit: "Flacon", form: "Solution", category: "Antiseptique", pricing: 0, min: 10 },
];
