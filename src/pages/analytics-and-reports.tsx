import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Download, FileDown, Filter } from "lucide-react";

// Types
interface DemandData {
  month: string;
  actual: number;
  forecast: number;
}

interface InventoryData {
  category: string;
  turnoverRate: number;
  deadStock: number;
}

interface ExportFormat {
  format: "PDF" | "Excel";
}

// Mock data
const demandForecastData: DemandData[] = [
  { month: "Jan", actual: 4000, forecast: 4400 },
  { month: "Feb", actual: 3000, forecast: 3200 },
  { month: "Mar", actual: 2000, forecast: 2400 },
  { month: "Apr", actual: 2780, forecast: 2900 },
  { month: "May", actual: 1890, forecast: 2100 },
  { month: "Jun", actual: 2390, forecast: 2500 },
];

const inventoryHealthData: InventoryData[] = [
  { category: "Electronics", turnoverRate: 5.2, deadStock: 120 },
  { category: "Clothing", turnoverRate: 6.8, deadStock: 85 },
  { category: "Home & Garden", turnoverRate: 4.5, deadStock: 150 },
  { category: "Toys", turnoverRate: 7.2, deadStock: 60 },
  { category: "Books", turnoverRate: 3.9, deadStock: 200 },
];

// Component
const AnalyticsAndReports: React.FC = () => {
  // State
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [category, setCategory] = useState<string>("");

  // Handlers
  const handleExport = ({ format }: ExportFormat) => {
    console.log(`Exporting as ${format}`);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [id.replace("-date", "Date")]: value
    }));
  };

  const generateCustomReport = () => {
    console.log("Generating custom report with:", {
      dateRange,
      category,
    });
  };

  // Sub-components
  const DemandForecastChart = () => (
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
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#8884d8" 
              name="Actual Demand"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#82ca9d" 
              name="Forecasted Demand"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleExport({ format: "PDF" })} className="mr-2">
          <FileDown className="mr-2 h-4 w-4" /> Export as PDF
        </Button>
        <Button onClick={() => handleExport({ format: "Excel" })} variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export as Excel
        </Button>
      </CardFooter>
    </Card>
  );

  const InventoryHealthReport = () => (
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
            <Bar yAxisId="left" dataKey="turnoverRate" fill="#8884d8" name="Turnover Rate" />
            <Bar yAxisId="right" dataKey="deadStock" fill="#82ca9d" name="Dead Stock" />
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
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell>{item.turnoverRate.toFixed(2)}</TableCell>
                <TableCell>{item.deadStock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleExport({ format: "PDF" })} className="mr-2">
          <FileDown className="mr-2 h-4 w-4" /> Export as PDF
        </Button>
        <Button onClick={() => handleExport({ format: "Excel" })} variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export as Excel
        </Button>
      </CardFooter>
    </Card>
  );

  const CustomReportGenerator = () => (
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
                value={dateRange.startDate}
                onChange={handleDateChange}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={dateRange.endDate}
                onChange={handleDateChange}
                className="w-full"
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
        <Button onClick={generateCustomReport} className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Generate Custom Report
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics and Reports</h1>
      <DemandForecastChart />
      <InventoryHealthReport />
      <CustomReportGenerator />
    </div>
  );
};

export default AnalyticsAndReports;