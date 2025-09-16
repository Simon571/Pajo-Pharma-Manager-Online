'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal order amounts for pharmaceutical products based on sales trends.
 *
 * - suggestOrderAmounts - A function that initiates the order suggestion process.
 * - SuggestOrderAmountsInput - The input type for the suggestOrderAmounts function.
 * - SuggestOrderAmountsOutput - The return type for the suggestOrderAmounts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOrderAmountsInputSchema = z.object({
  salesData: z.string().describe('Historical sales data for pharmaceutical products, including product names, quantities sold, and dates. Represented as a string.'),
  currentStockLevels: z.string().describe('Current stock levels for each product, including product names and quantities. Represented as a string.'),
  orderingConstraints: z.string().describe('Constraints on ordering, such as budget limits, storage capacity, or supplier lead times. Represented as a string.'),
});
export type SuggestOrderAmountsInput = z.infer<typeof SuggestOrderAmountsInputSchema>;

const SuggestOrderAmountsOutputSchema = z.object({
  suggestedOrders: z.string().describe('A list of suggested order amounts for each product, including product names and quantities to order. Represented as a string.'),
  rationale: z.string().describe('Explanation of the reasoning behind the suggested order amounts, considering sales trends, current stock levels, and ordering constraints.'),
});
export type SuggestOrderAmountsOutput = z.infer<typeof SuggestOrderAmountsOutputSchema>;

export async function suggestOrderAmounts(input: SuggestOrderAmountsInput): Promise<SuggestOrderAmountsOutput> {
  return suggestOrderAmountsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOrderAmountsPrompt',
  input: {schema: SuggestOrderAmountsInputSchema},
  output: {schema: SuggestOrderAmountsOutputSchema},
  prompt: `You are an AI assistant that analyzes sales trends and suggests optimal ordering amounts for pharmaceutical products.

  Consider the following sales data, current stock levels, and ordering constraints to generate a list of suggested order amounts and a rationale for your suggestions.

  Sales Data: {{{salesData}}}
  Current Stock Levels: {{{currentStockLevels}}}
  Ordering Constraints: {{{orderingConstraints}}}

  Based on this information, provide a list of suggested order amounts for each product and a rationale for your suggestions.
  Ensure that the suggested orders will not cause medicine spoilage due to overstocking.
  Output the suggested orders as a simple list of product names and the number of units to order.
`,
});

const suggestOrderAmountsFlow = ai.defineFlow(
  {
    name: 'suggestOrderAmountsFlow',
    inputSchema: SuggestOrderAmountsInputSchema,
    outputSchema: SuggestOrderAmountsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
