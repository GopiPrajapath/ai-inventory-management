"use client"

import  { useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { AlertTriangle, BarChart2,  Package,  ShoppingCart,} from 'lucide-react'

import Sidebar from "../components/ui/HeaderandSideBar"
// Mock data for charts and tables
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const topSellingProducts = [
  { name: 'Product A', sales: 1200 },
  { name: 'Product B', sales: 900 },
  { name: 'Product C', sales: 800 },
  { name: 'Product D', sales: 700 },
  { name: 'Product E', sales: 600 },
]

const inventoryDistribution = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 200 },
  { name: 'Category D', value: 100 },
]

const latestPurchases = [
  { id: 1, item: 'Product X', quantity: 50, date: '2023-06-15', supplier: 'Supplier A' ,amountPaid: 20000,amountRemaining :80000},
  { id: 2, item: 'Product Y', quantity: 30, date: '2023-06-14', supplier: 'Supplier B',amountPaid: 20000,amountRemaining :80000},
  { id: 3, item: 'Product Z', quantity: 40, date: '2023-06-13', supplier: 'Supplier C',amountPaid: 20000,amountRemaining :80000 },
]

const lowStockAlerts = [
  { id: 1, item: 'Product P', currentStock: 5, threshold: 10 },
  { id: 2, item: 'Product Q', currentStock: 3, threshold: 15 },
  { id: 3, item: 'Product R', currentStock: 8, threshold: 20 },
]

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Select Period')

  return (
    <Sidebar> 
      <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
          {/* Dashboard Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.5</div>
                    <p className="text-xs text-muted-foreground">Turns per year</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <Progress value={78} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">48 shipped today</p>
                  </CardContent>
                </Card>
              </div>
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topSellingProducts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              {/* Tables and AI Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>Latest Purchases</CardTitle>
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary">{selectedPeriod}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 7 Days')}>Last 7 Days</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 30 Days')}>Last 30 Days</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 3 Months')}>Last 3 Months</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 6 Months')}>Last 6 Months</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedPeriod('Last Year')}>Last Year</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Amount Paid</TableHead>
                          <TableHead>Amount Remaining</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {latestPurchases.map((purchase) => (
                          <TableRow key={purchase.id}>
                            <TableCell>{purchase.item}</TableCell>
                            <TableCell>{purchase.quantity}</TableCell>
                            <TableCell>{purchase.date}</TableCell>
                            <TableCell>{purchase.supplier}</TableCell>
                            <TableCell>{purchase.amountPaid}</TableCell>
                            <TableCell>{purchase.amountRemaining}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Demand Forecast Alert</AlertTitle>
                      <AlertDescription>
                        Our AI predicts a 30% increase in demand for Product A next month. Consider increasing your stock levels.
                      </AlertDescription>
                    </Alert>
                    <Alert className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Anomaly Detected</AlertTitle>
                      <AlertDescription>
                        Unusual sales pattern detected for Product B. Sales have dropped by 50% in the last week.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
              {/* Low Stock Alerts and Inventory Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Low Stock Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Current Stock</TableHead>
                          <TableHead>Threshold</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowStockAlerts.map((alert) => (
                          <TableRow key={alert.id}>
                            <TableCell>{alert.item}</TableCell>
                            <TableCell>{alert.currentStock}</TableCell>
                            <TableCell>{alert.threshold}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">Reorder</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={inventoryDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {inventoryDistribution.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
    </Sidebar>
  )
}