import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { pools } from "@/lib/data"
  import { cn } from "@/lib/utils"
  import { MoreVertical } from "lucide-react"
  import { Button } from "@/components/ui/button"
  
  export function RecentAlertsTable() {
    const sortedPools = [...pools].sort((a, b) => {
      const statusOrder = { Critical: 0, Warning: 1, Good: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }).slice(0, 5);
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            A summary of pools with recent status changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pool</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPools.map((pool) => (
                <TableRow key={pool.id}>
                  <TableCell>
                    <div className="font-medium">{pool.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pool.status === "Critical" ? "destructive" :
                        pool.status === "Warning" ? "secondary" : "default"
                      }
                      className={cn(
                        pool.status === 'Warning' && 'bg-yellow-400 text-yellow-900'
                      )}
                    >
                      {pool.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{pool.location}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  