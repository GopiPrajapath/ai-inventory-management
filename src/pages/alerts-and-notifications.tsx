import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { ScrollArea } from '../components/ui/scroll-area'
import { AlertTriangle, TrendingDown, TrendingUp, Calendar, Bell, Settings } from 'lucide-react'

export default function AlertsAndNotifications() {
  // Mock data for alerts and notifications
  const anomalyAlerts = [
    { id: 1, item: 'Wireless Earbuds', description: 'Unusual spike in returns', severity: 'high' },
    { id: 2, item: 'Smart Watch', description: 'Unexpected drop in sales', severity: 'medium' },
    { id: 3, item: 'Laptop Charger', description: 'Inventory count mismatch', severity: 'low' },
  ]

  const lowStockAlerts = [
    { id: 1, item: 'Smartphone Case', currentStock: 5, reorderPoint: 10 },
    { id: 2, item: 'HDMI Cable', currentStock: 3, reorderPoint: 15 },
    { id: 3, item: 'Wireless Mouse', currentStock: 8, reorderPoint: 20 },
  ]

  const overstockAlerts = [
    { id: 1, item: 'USB Flash Drive', currentStock: 500, optimalStock: 200 },
    { id: 2, item: 'Keyboard', currentStock: 300, optimalStock: 150 },
  ]

  const upcomingDemand = [
    { id: 1, item: 'Gaming Console', expectedDemand: 1000, currentStock: 500, date: '2023-12-01' },
    { id: 2, item: 'Wireless Headphones', expectedDemand: 500, currentStock: 200, date: '2023-11-15' },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Alerts and Notifications</h1>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Configure Alerts
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Anomaly Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Anomaly Alerts
            </CardTitle>
            <CardDescription>Highlighting discrepancies or unusual patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {anomalyAlerts.map((alert) => (
                <Alert key={alert.id} className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center">
                    {alert.item}
                    <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'} className="ml-2">
                      {alert.severity}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Real-time notifications for items with low stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Point</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{alert.item}</TableCell>
                      <TableCell>{alert.currentStock}</TableCell>
                      <TableCell>{alert.reorderPoint}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Reorder Now</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Bell className="mr-2 h-4 w-4" />
              Set Up Automatic Reorders
            </Button>
          </CardFooter>
        </Card>

        {/* Overstock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
              Overstock Alerts
            </CardTitle>
            <CardDescription>Recommendations for optimizing surplus inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {overstockAlerts.map((alert) => (
                <Alert key={alert.id} className="mb-4">
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>{alert.item}</AlertTitle>
                  <AlertDescription>
                    Current stock: {alert.currentStock}, Optimal stock: {alert.optimalStock}
                    <br />
                    Consider running a promotion or reallocating {alert.currentStock - alert.optimalStock} units.
                  </AlertDescription>
                </Alert>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Generate Optimization Plan</Button>
          </CardFooter>
        </Card>

        {/* Upcoming Demand */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-green-500" />
              Upcoming Demand
            </CardTitle>
            <CardDescription>Notifications for expected spikes in demand</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Expected Demand</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingDemand.map((demand) => (
                    <TableRow key={demand.id}>
                      <TableCell>{demand.item}</TableCell>
                      <TableCell>{demand.expectedDemand}</TableCell>
                      <TableCell>{demand.currentStock}</TableCell>
                      <TableCell>{demand.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Prepare for Upcoming Demand</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}