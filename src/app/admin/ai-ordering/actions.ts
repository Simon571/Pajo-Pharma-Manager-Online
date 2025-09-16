"use server";
// Ici tu pourras brancher une vraie IA (Genkit) plus tard pour calculer les quantités
export async function suggestOrderAmounts(input: { history?: unknown }) {
  return { ok: true, suggestions: [] };
}
