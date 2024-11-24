import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BarChart, Brain, Search, TrendingUp, AlertTriangle, MessageSquare } from 'lucide-react'
import OptimizedImage from '../components/ui/OptimizedImage' // Adjust the import path based on your file structure
import { Link } from 'react-router-dom'
import logoImage from '../Images/Logo/logo-placeholder.svg'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
// Then use them like this:

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
        <OptimizedImage src={logoImage} alt="InventoryAI Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-blue-600">InventoryAI</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
          <Link to = '/pricing'>
          <a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a>
          </Link>
          <Link to = '/about'>
          <a href="#" className="text-gray-600 hover:text-blue-600">About Us</a>
          </Link>
          <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
        </nav>
 
        <Link to="/login">
            <Button>Get Started</Button>
        </Link>
        
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Optimize Your Inventory with AI-Powered Insights</h1>
        <p className="text-xl text-gray-600 mb-8">Revolutionize your e-commerce business with smart inventory management</p>
        <div className="flex justify-center space-x-4">
          <Link to ='/login'>
          <Button size="lg">Request a Demo</Button>
          </Link>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </section>

      {/* Feature Overview */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Smarter Inventory Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BarChart className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stock Optimization</h3>
              <p className="text-gray-600">Maintain optimal stock levels to minimize costs and maximize profits</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Demand Forecasting</h3>
              <p className="text-gray-600">Predict future demand with AI-powered analytics to stay ahead of trends</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Brain className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-gray-600">Make data-driven decisions with advanced predictive models</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Anomaly Detection</h3>
              <p className="text-gray-600">Identify and address unusual patterns in your inventory data</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MessageSquare className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Natural Language Processing</h3>
              <p className="text-gray-600">Interact with your inventory data using simple, conversational queries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Search className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">Quickly find and analyze inventory items with intelligent search capabilities</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <Tabs defaultValue="testimonial1" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="testimonial1">Gopi Prajapath</TabsTrigger>
              <TabsTrigger value="testimonial2">Sai Kumar</TabsTrigger>
              <TabsTrigger value="testimonial3">Sai Kumar Pilla</TabsTrigger>
            </TabsList>
            <TabsContent value="testimonial1">
              <Card>
                <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar-placeholder.png" />
                <AvatarFallback>Gopi</AvatarFallback> 
               </Avatar>
              </div>
                  <p className="text-lg mb-4">"InventoryAI has transformed our e-commerce operations. We've reduced stockouts by 75% and improved our profit margins significantly."</p>
                  <p className="font-semibold">Gopi P., CEO of FashionFlex</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonial2">
              <Card>
                <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar-placeholder.png" />
                <AvatarFallback>Sai Kumar</AvatarFallback> 
               </Avatar>
               </div>
                  <p className="text-lg mb-4">"The demand forecasting feature is a game-changer. We're now always prepared for seasonal fluctuations and trends."</p>
                  <p className="font-semibold">Sai Kumar m., Inventory Manager at TechTrends</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonial3">
              <Card>
                <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar-placeholder.png" />
                <AvatarFallback>Sai Kumar Pilla</AvatarFallback> 
               </Avatar>
               </div>
                  <p className="text-lg mb-4">"The natural language processing capability has made inventory management accessible to our entire team. It's incredibly user-friendly."</p>
                  <p className="font-semibold">Sai Kumar Pilla, COO of HomeHarbor</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Inventory?</h2>
        <p className="text-xl text-gray-600 mb-8">Join thousands of e-commerce businesses using InventoryAI to boost efficiency and profitability</p>
        <Link to="/login">
        <Button size="lg">Get Started Now</Button>
        </Link>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">How does AI improve inventory management?</h3>
                <p className="text-gray-600">AI analyzes historical data, market trends, and real-time information to provide accurate demand forecasts and optimize stock levels, reducing costs and improving efficiency.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Is InventoryAI suitable for small businesses?</h3>
                <p className="text-gray-600">InventoryAI is designed to scale with your business, offering powerful features that benefit both small and medium-sized e-commerce operations.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">How long does it take to set up?</h3>
                <p className="text-gray-600">Most businesses can be up and running with InventoryAI in just a few days. Our team provides comprehensive onboarding and support to ensure a smooth transition.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Can InventoryAI integrate with my existing systems?</h3>
                <p className="text-gray-600">Yes, InventoryAI offers seamless integration with popular e-commerce platforms, ERP systems, and other inventory management tools to enhance your existing workflow.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">InventoryAI</h3>
              <p>Empowering e-commerce businesses with AI-driven inventory management solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#features" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Email: info..inventoryai.com</li>
                <li>Phone: +91 6303118648</li>
                <li>Address:MLRITM,Hyderabad</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <form className="flex">
                <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
                <Button type="submit" className="rounded-l-none">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-500 text-center">
            <p>&copy; 2023 InventoryAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat */}
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-full w-16 h-16 shadow-lg">
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
