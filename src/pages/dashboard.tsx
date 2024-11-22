import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Package, TrendingDown, TrendingUp, AlertTriangle, PlusCircle, MinusCircle, FileText } from 'lucide-react'

// Mock data for the charts
const demandForecastData = [
  { name: 'Jan', Actual: 4000, Forecast: 4400 },
  { name: 'Feb', Actual: 3000, Forecast: 3200 },
  { name: 'Mar', Actual: 2000, Forecast: 2400 },
  { name: 'Apr', Actual: 2780, Forecast: 2900 },
  { name: 'May', Actual: 1890, Forecast: 2100 },
  { name: 'Jun', Actual: 2390, Forecast: 2500 },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stock Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,345</div>
            <Progress value={65} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-2">65% of capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Items Nearing Depletion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">23</div>
            <div className="flex items-center mt-2">
              <TrendingDown className="text-yellow-500 mr-2" />
              <span className="text-sm text-muted-foreground">5% of total inventory</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overstocked Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">7</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="text-blue-500 mr-2" />
              <span className="text-sm text-muted-foreground">2% of total inventory</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demand Forecast */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Demand Forecast</CardTitle>
          <CardDescription>AI-predicted demand for top-selling items</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Actual" stroke="#8884d8" />
              <Line type="monotone" dataKey="Forecast" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <Badge variant="secondary">Seasonal Trend</Badge>
            <span className="ml-2 text-sm text-muted-foreground">10% increase expected in Q4</span>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Restocking Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Package className="mr-2" />
                <span>Restock Item A (100 units)</span>
              </li>
              <li className="flex items-center">
                <Package className="mr-2" />
                <span>Restock Item B (50 units)</span>
              </li>
              <li className="flex items-center">
                <Package className="mr-2" />
                <span>Restock Item C (75 units)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projected Inventory Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$24,500</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="text-green-500 mr-2" />
              <span className="text-sm text-muted-foreground">5% decrease from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anomaly Detection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Anomaly Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Unusual Sales Pattern Detected</AlertTitle>
            <AlertDescription>
              Item X has shown a 200% increase in sales over the last 24 hours. Consider investigating and adjusting stock levels.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Action Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Stock
          </Button>
          <Button variant="secondary">
            <MinusCircle className="mr-2 h-4 w-4" /> Remove Stock
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}