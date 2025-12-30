'use client';

import { useState, useActionState, useMemo, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { runPoolAlerts, FormState } from '@/lib/actions';
import { type Pool, type PoolHealthData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Bot, Info, Loader2, Sparkles, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: FormState = {
  message: '',
  output: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Alert
        </>
      )}
    </Button>
  );
}

export function AIAlertGenerator({
  pools,
  allHealthData,
}: {
  pools: Pool[];
  allHealthData: Record<string, PoolHealthData[]>;
}) {
  const [state, formAction] = useActionState(runPoolAlerts, initialState);
  const [selectedPoolId, setSelectedPoolId] = useState<string>('');
  const [selectedPoolData, setSelectedPoolData] = useState<PoolHealthData[]>([]);

  useEffect(() => {
    if (selectedPoolId) {
      setSelectedPoolData(allHealthData[selectedPoolId] || []);
    } else {
      setSelectedPoolData([]);
    }
  }, [selectedPoolId, allHealthData]);

  const historicalDataString = useMemo(() => JSON.stringify(selectedPoolData), [selectedPoolData]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Analysis Setup</CardTitle>
            <CardDescription>Select a pool to analyze its historical data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Select name="poolId" onValueChange={setSelectedPoolId} value={selectedPoolId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pool" />
                </SelectTrigger>
                <SelectContent>
                  {pools.map((pool) => (
                    <SelectItem key={pool.id} value={pool.id}>
                      {pool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.poolId && <p className="text-sm font-medium text-destructive mt-2">{state.errors.poolId[0]}</p>}
            </div>

            <input type="hidden" name="historicalData" value={historicalDataString} />

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Historical Data</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-60 overflow-y-auto">
                    {selectedPoolData.length > 0 ? (
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>pH</TableHead>
                            <TableHead>Chlorine</TableHead>
                            <TableHead>Temp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedPoolData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.pH}</TableCell>
                                <TableCell>{data.chlorine}</TableCell>
                                <TableCell>{data.temperature}°C</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            {selectedPoolId ? "No data for this pool." : "Select a pool to see data."}
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Result</CardTitle>
          <CardDescription>The AI's assessment will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.errors?.server && (
             <Alert variant="destructive">
             <AlertCircle className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>{state.errors.server[0]}</AlertDescription>
           </Alert>
          )}

          {state.output ? (
            <>
              <Alert variant={state.output.alertRequired ? "destructive" : "default"} className={!state.output.alertRequired ? "bg-green-50 border-green-200 text-green-800" : ""}>
                 {state.output.alertRequired ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                <AlertTitle>{state.output.alertRequired ? "Attention Required" : "All Systems Normal"}</AlertTitle>
                <AlertDescription>
                  {state.output.alertMessage}
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center"><Bot className="mr-2 h-5 w-5" /> Suggested Adjustments</h3>
                <pre className="mt-2 rounded-md bg-secondary p-4">
                  <code className="text-sm text-secondary-foreground">{state.output.suggestedAdjustments}</code>
                </pre>
              </div>
            </>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
                <div className="text-center text-muted-foreground">
                    <Bot className="mx-auto h-12 w-12"/>
                    <p>Awaiting analysis...</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
