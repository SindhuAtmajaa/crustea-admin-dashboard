'use server';

/**
 * @fileOverview AI-powered alerts for pool management.
 *
 * - generatePoolAlert - A function that generates alerts and suggests pool parameter adjustments.
 * - PoolAlertInput - The input type for the generatePoolAlert function.
 * - PoolAlertOutput - The return type for the generatePoolAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PoolDataSchema = z.object({
  timestamp: z.string().describe('The timestamp of the data point.'),
  pH: z.number().describe('The pH level of the pool water.'),
  chlorine: z.number().describe('The chlorine level of the pool water.'),
  temperature: z.number().describe('The temperature of the pool water in Celsius.'),
  TDS: z.number().describe('The Total Dissolved Solids in the pool water.'),
  alkalinity: z.number().describe('The alkalinity of the pool water.'),
});

const PoolAlertInputSchema = z.object({
  poolId: z.string().describe('The ID of the pool.'),
  historicalData: z.array(PoolDataSchema).describe('Historical pool data.'),
});
export type PoolAlertInput = z.infer<typeof PoolAlertInputSchema>;

const PoolAlertOutputSchema = z.object({
  alertRequired: z.boolean().describe('Whether an alert requires admin attention.'),
  alertMessage: z.string().describe('A message describing the issue and suggested actions.'),
  suggestedAdjustments: z.string().describe('Suggested adjustments for pool parameters.'),
});
export type PoolAlertOutput = z.infer<typeof PoolAlertOutputSchema>;

export async function generatePoolAlert(input: PoolAlertInput): Promise<PoolAlertOutput> {
  return poolAlertFlow(input);
}

const poolAlertPrompt = ai.definePrompt({
  name: 'poolAlertPrompt',
  input: {schema: PoolAlertInputSchema},
  output: {schema: PoolAlertOutputSchema},
  prompt: `You are an AI assistant that analyzes historical pool data and suggests parameter adjustments.

  Analyze the following historical data for pool ID {{{poolId}}}:

  Historical Data: {{{historicalData}}}

  Based on the historical data, determine if an alert is required. If parameters are within normal bounds, alertRequired should be false. If outside of normal bounds, alertRequired should be true.

  Provide a detailed alertMessage explaining the issue and its potential consequences.

  Suggest specific adjustments to pool parameters (pH, chlorine, temperature, etc.) to maintain optimal pool health.  These should be plain text.  You must set the suggestedAdjustments field to these. Do not provide any preamble or exclamations.

  Ensure that the output is well-formatted and easy to understand for a pool administrator.
  Remember alertRequired should be set to true if an alert requires human attention, and false otherwise.

  Output should conform to the following schema: {{{outputSchema}}}`,
});

const poolAlertFlow = ai.defineFlow(
  {
    name: 'poolAlertFlow',
    inputSchema: PoolAlertInputSchema,
    outputSchema: PoolAlertOutputSchema,
  },
  async input => {
    const {output} = await poolAlertPrompt(input);
    return output!;
  }
);
