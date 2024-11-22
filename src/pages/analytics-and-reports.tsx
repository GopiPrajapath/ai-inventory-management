import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Download, FileDown, Filter } from 'lucide-react'

// Mock data for charts
const demandForecastData = [
  { month: 'Jan', actual: 4000, forecast: 4400 },
  { month: 'Feb', actual: 3000, forecast: 3200 },
  { month: 'Mar', actual: 2000, forecast: 2400 },
  { month: 'Apr', actual: 2780, forecast: 2900 },
  { month: 'May', actual: 1890, forecast: 2100 },
  { month: 'Jun', actual: 2390, forecast: 2500 },
]

const inventoryHealthData = [
  { category: 'Electronics', turnoverRate: 5.2, deadStock: 120 },
  { category: 'Clothing', turnoverRate: 6.8, deadStock: 85 },
  { category: 'Home & Garden', turnoverRate: 4.5, deadStock: 150 },
  { category: 'Toys', turnoverRate: 7.2, deadStock: 60 },
  { category: 'Books', turnoverRate: 3.9, deadStock: 200 },
]

export default function AnalyticsAndReports() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [category, setCategory] = useState('')

  const handleExport = (format: string) => {
    // Implement export logic here
    console.log(`Exporting as ${format}`)
  }

  const generateCustomReport = () => {
    // Implement custom report generation logic here
    console.log('Generating custom report with:', { startDate, endDate, category })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics and Reports</h1>

      {/* Demand Forecasting Reports */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Demand Forecasting</CardTitle>
          <CardDescription>Graphical representation of demand trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Demand" />
              <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecasted Demand" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleExport('PDF')} className="mr-2">
            <FileDown className="mr-2 h-4 w-4" /> Export as PDF
          </Button>
          <Button onClick={() => handleExport('Excel')} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export as Excel
          </Button>
        </CardFooter>
      </Card>

      {/* Inventory Health Report */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Inventory Health Report</CardTitle>
          <CardDescription>Key metrics including turnover rate and dead stock</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar dataKey="turnoverRate" fill="#8884d8" name="Turnover Rate" />
              <Bar dataKey="deadStock" fill="#82ca9d" name="Dead Stock" />
            </BarChart>
          </ResponsiveContainer>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Turnover Rate</TableHead>
                <TableHead>Dead Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryHealthData.map((item) => (
                <TableRow key={item.category}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.turnoverRate.toFixed(2)}</TableCell>
                  <TableCell>{item.deadStock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleExport('PDF')} className="mr-2">
            <FileDown className="mr-2 h-4 w-4" /> Export as PDF
          </Button>
          <Button onClick={() => handleExport('Excel')} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export as Excel
          </Button>
        </CardFooter>
      </Card>

      {/* Custom Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Reports</CardTitle>
          <CardDescription>Generate custom reports based on specific criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="toys">Toys</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generateCustomReport}>
            <Filter className="mr-2 h-4 w-4" /> Generate Custom Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}