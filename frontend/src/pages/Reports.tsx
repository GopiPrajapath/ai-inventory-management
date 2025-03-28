import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, TrendingUp, Package, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Sidebar from '../components/ui/HeaderandSideBar'

// Mock data for charts and metrics
const salesData = [
  { month: 'Jan', sales: 4000, orders: 240, inventory: 1200 },
  { month: 'Feb', sales: 3000, orders: 198, inventory: 1100 },
  { month: 'Mar', sales: 5000, orders: 280, inventory: 900 },
  { month: 'Apr', sales: 4500, orders: 308, inventory: 1300 },
  { month: 'May', sales: 6000, orders: 389, inventory: 1400 },
  { month: 'Jun', sales: 5500, orders: 320, inventory: 1200 }
]

const topProducts = [
  { name: 'Product A', sales: 1200, growth: 15 },
  { name: 'Product B', sales: 950, growth: -8 },
  { name: 'Product C', sales: 850, growth: 25 },
  { name: 'Product D', sales: 750, growth: 12 }
]

function ReportPage() {
  const [timeRange, setTimeRange] = useState('6months')

  return (
    <Sidebar>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  +20.1% <ArrowUpRight className="h-4 w-4" />
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,735</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  +15.3% <ArrowUpRight className="h-4 w-4" />
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Inventory</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,456</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center">
                  -8.5% <ArrowDownRight className="h-4 w-4" />
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$26.07</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  +4.5% <ArrowUpRight className="h-4 w-4" />
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales & Orders Overview</CardTitle>
              <CardDescription>Monthly sales and order volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      name="Sales ($)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#82ca9d"
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Levels</CardTitle>
              <CardDescription>Monthly inventory trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inventory" fill="#8884d8" name="Units in Stock" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products and their growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Total Sales</th>
                    <th className="text-left py-3 px-4">Growth</th>
                    <th className="text-left py-3 px-4">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.sales} units</td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center ${product.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {product.growth > 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                          {Math.abs(product.growth)}%
                        </span>
                      </td>
                      <td className="py-3 px-4">${(product.sales * 25).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  )
}
export default ReportPage