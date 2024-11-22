import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { BarChart3, Settings, AlertTriangle, TrendingUp, Boxes, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Inventory Management System</h1>
      
      {/* Welcome Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Welcome to Your Inventory Hub</CardTitle>
          <CardDescription>Streamline your inventory process with our powerful and intuitive software.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Our inventory management system helps you track stock levels, optimize reorder points, and gain valuable insights into your inventory performance. Stay ahead of demand and minimize stockouts with our advanced features and real-time analytics.</p>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/dashboard">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <BarChart3 className="h-6 w-6 mb-2" />
              Dashboard
            </Button>
          </Link>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
            <FileText className="h-6 w-6 mb-2" />
            Reports
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
            <TrendingUp className="h-6 w-6 mb-2" />
            Analytics
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
            <Settings className="h-6 w-6 mb-2" />
            Settings
          </Button>
        </CardContent>
      </Card>

      {/* Live Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Live Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Stock Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Boxes className="h-8 w-8 mr-2 text-blue-500" />
                <span className="text-2xl font-bold">1,234</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Total items in stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 mr-2 text-yellow-500" />
                <span className="text-2xl font-bold">3</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Low stock warnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 mr-2 text-green-500" />
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Items to reorder</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}