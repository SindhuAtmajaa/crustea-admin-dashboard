import { StatsCards } from "./components/stats-cards";
import { PoolHealthChart } from "./components/pool-health-chart";
import { RecentAlertsTable } from "./components/recent-alerts-table";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <StatsCards />
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <PoolHealthChart />
                </div>
                <div>
                   <RecentAlertsTable />
                </div>
            </div>
        </div>
    );
}
