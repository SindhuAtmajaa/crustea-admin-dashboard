import { AIAlertGenerator } from "./components/ai-alert-generator";
import { pools, poolHealthData } from "@/lib/data";

export default function AIAlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Powered Alerts</h1>
        <p className="text-muted-foreground">
          Use historical data to generate intelligent alerts and parameter adjustments.
        </p>
      </div>
      <AIAlertGenerator pools={pools} allHealthData={poolHealthData} />
    </div>
  );
}
