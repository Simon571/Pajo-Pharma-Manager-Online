'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing strategic analysis for pharmacy administrators.
 *
 * - runStrategicAnalysis - A function that initiates the strategic analysis process.
 * - StrategicAnalysisInput - The input type for the runStrategicAnalysis function.
 * - StrategicAnalysisOutput - The return type for the runStrategicAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StrategicAnalysisInputSchema = z.object({
  salesData: z.string().describe('Historical sales data for pharmaceutical products, including product names, quantities sold, dates, and total revenue. Represented as a string.'),
  inventoryData: z.string().describe('Current inventory data, including product names, stock levels, and expiry dates. Represented as a string.'),
});
export type StrategicAnalysisInput = z.infer<typeof StrategicAnalysisInputSchema>;

const StrategicAnalysisOutputSchema = z.object({
    topPerformingProducts: z.string().describe("A summary of the best-selling or most profitable products."),
    underperformingProducts: z.string().describe("A summary of products with low sales or nearing expiration."),
    strategicRecommendations: z.string().describe("Actionable recommendations for the administrator, such as promotions for specific products, suggestions for destocking, or pricing adjustments."),
});
export type StrategicAnalysisOutput = z.infer<typeof StrategicAnalysisOutputSchema>;

export async function runStrategicAnalysis(input: StrategicAnalysisInput): Promise<StrategicAnalysisOutput> {
  return strategicAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'strategicAnalysisPrompt',
  input: {schema: StrategicAnalysisInputSchema},
  output: {schema: StrategicAnalysisOutputSchema},
  prompt: `You are a strategic advisor AI for a pharmacy administrator. Your role is to analyze sales and inventory data to provide actionable insights.

  Analyze the following data:
  Sales Data: {{{salesData}}}
  Inventory Data: {{{inventoryData}}}

  Based on your analysis, provide the following:
  1.  **Top-Performing Products:** Identify the products that are selling the best or are the most profitable. Briefly explain why.
  2.  **Underperforming Products:** Identify products that are not selling well or are close to their expiration date.
  3.  **Strategic Recommendations:** Provide clear, actionable recommendations. For example, suggest promotions for underperforming items, advise on destocking items nearing expiration to cut losses, or recommend focusing on high-performing products.

  Your tone should be professional, concise, and helpful, as you are addressing a business administrator.
`,
});

const strategicAnalysisFlow = ai.defineFlow(
  {
    name: 'strategicAnalysisFlow',
    inputSchema: StrategicAnalysisInputSchema,
    outputSchema: StrategicAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
