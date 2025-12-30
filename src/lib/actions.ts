'use server';

import { generatePoolAlert, type PoolAlertInput, type PoolAlertOutput } from '@/ai/flows/ai-powered-alerts';

// This is a type for the form state
export type FormState = {
  message: string;
  output: PoolAlertOutput | null;
  errors: {
    poolId?: string[];
    historicalData?: string[];
    server?: string[];
  } | null;
};

// This is the server action that will be called from the form
export async function runPoolAlerts(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const poolId = formData.get('poolId') as string;
  const historicalDataString = formData.get('historicalData') as string;

  if (!poolId) {
    return {
      message: 'Failed to generate alert.',
      output: null,
      errors: { poolId: ['Please select a pool.'] },
    };
  }

  if (!historicalDataString || historicalDataString === '[]') {
    return {
        message: 'Failed to generate alert.',
        output: null,
        errors: { server: ['No historical data available for this pool to analyze.'] },
      };
  }

  try {
    const historicalData = JSON.parse(historicalDataString);
    const input: PoolAlertInput = {
      poolId,
      historicalData,
    };

    const output = await generatePoolAlert(input);

    return {
      message: 'Alert analysis complete.',
      output,
      errors: null,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      message: 'Failed to generate alert.',
      output: null,
      errors: { server: [errorMessage] },
    };
  }
}
