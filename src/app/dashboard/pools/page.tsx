import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { pools } from "@/lib/data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function PoolsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Pool Management</h1>
                    <p className="text-muted-foreground">
                        Add, edit, and remove pool information.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Pool
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Pools</CardTitle>
                    <CardDescription>A list of all managed pools in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Devices</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pools.map((pool) => (
                                <TableRow key={pool.id}>
                                    <TableCell className="font-medium">{pool.name}</TableCell>
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
                                    <TableCell>{pool.size}</TableCell>
                                    <TableCell>{pool.devices.length}</TableCell>
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
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
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
