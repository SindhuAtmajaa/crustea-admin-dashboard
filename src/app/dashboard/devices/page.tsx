import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { devices, pools } from "@/lib/data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function DevicesPage() {
    
    const getPoolName = (poolId?: string) => {
        if (!poolId) return "Unassigned";
        return pools.find(p => p.id === poolId)?.name || "Unknown Pool";
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Device Management</h1>
                    <p className="text-muted-foreground">
                        Register, monitor, and configure connected devices.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Device
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Devices</CardTitle>
                    <CardDescription>A list of all registered devices in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Assigned Pool</TableHead>
                                <TableHead>Last Seen</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {devices.map((device) => (
                                <TableRow key={device.id}>
                                    <TableCell className="font-medium">{device.name}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={device.status === "Error" ? "destructive" : "default"}
                                            className={cn(
                                                "capitalize",
                                                device.status === 'Online' && 'bg-green-500',
                                                device.status === 'Offline' && 'bg-gray-400'
                                            )}
                                        >
                                            {device.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{device.type}</TableCell>
                                    <TableCell>{getPoolName(device.poolId)}</TableCell>
                                    <TableCell>{device.lastSeen}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Configure</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
