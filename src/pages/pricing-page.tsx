import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Check, X, DollarSign,TrendingUp, ShieldCheck, MessageCircle} from 'lucide-react'
import OptimizedImage from '../components/ui/OptimizedImage'
import logoImage from '../Images/Logo/logo-placeholder.svg'
import { Link } from 'react-router-dom'
export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true)
  const [inventorySize, setInventorySize] = useState(1000)
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000)

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 29,
      annualPrice: 290,
      features: ['Up to 1,000 SKUs', 'Basic forecasting', 'Email support'],
    },
    {
      name: 'Standard',
      monthlyPrice: 79,
      annualPrice: 790,
      features: ['Up to 10,000 SKUs', 'Advanced forecasting', 'Priority email support', 'API access'],
    },
    {
      name: 'Premium',
      monthlyPrice: 199,
      annualPrice: 1990,
      features: ['Unlimited SKUs', 'AI-powered forecasting', '24/7 phone support', 'Custom integrations'],
    },
  ]

  const calculateROI = () => {
    const estimatedSavings = (inventorySize * 0.1) + (monthlyRevenue * 0.05)
    const annualSavings = estimatedSavings * 12
    return annualSavings.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
        <OptimizedImage src={logoImage} alt="InventoryAI Logo" width={40} height={40} />            
          <span className="text-2xl font-bold text-blue-600">InventoryAI</span>
        </div>
        <nav className="hidden md:flex space-x-6">
        <Link to ='/Homepage'>
          <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
          </Link>
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
            <Button> Get Started</Button>
        </Link>

      </header>

      <h1 className="text-4xl font-bold text-center mb-4">Choose the Right Plan for Your Business</h1>
      <p className="text-xl text-center text-gray-600 mb-8">Optimize your inventory management with our AI-powered solution</p>

      {/* Pricing Toggle */}
      <div className="flex justify-center items-center mb-8">
        <span className={`mr-2 ${annualBilling ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>Monthly</span>
        <button
          className={`w-16 h-8 rounded-full p-1 ${annualBilling ? 'bg-primary' : 'bg-gray-300'}`}
          onClick={() => setAnnualBilling(!annualBilling)}
        >
          <div className={`w-6 h-6 rounded-full bg-white transform duration-300 ease-in-out ${annualBilling ? 'translate-x-8' : ''}`} />
        </button>
        <span className={`ml-2 ${annualBilling ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>Annual (Save 20%)</span>
      </div>

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.name === 'Standard' ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {annualBilling ? (
                  <span className="text-3xl font-bold">${plan.annualPrice / 12}/mo</span>
                ) : (
                  <span className="text-3xl font-bold">${plan.monthlyPrice}/mo</span>
                )}
                {annualBilling && <span className="text-sm ml-2">billed annually</span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose {plan.name}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Basic</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Premium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>SKU Limit</TableCell>
                <TableCell>1,000</TableCell>
                <TableCell>10,000</TableCell>
                <TableCell>Unlimited</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Forecasting</TableCell>
                <TableCell>Basic</TableCell>
                <TableCell>Advanced</TableCell>
                <TableCell>AI-powered</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Support</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Priority Email</TableCell>
                <TableCell>24/7 Phone</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>API Access</TableCell>
                <TableCell><X className="text-red-500" /></TableCell>
                <TableCell><Check className="text-green-500" /></TableCell>
                <TableCell><Check className="text-green-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Custom Integrations</TableCell>
                <TableCell><X className="text-red-500" /></TableCell>
                <TableCell><X className="text-red-500" /></TableCell>
                <TableCell><Check className="text-green-500" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Value Proposition */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Improved Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            Reduce stockouts and overstock situations with AI-powered forecasting and real-time inventory tracking.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Cost Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            Optimize your inventory levels to reduce carrying costs and free up capital for other business needs.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Enhanced Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            Automate routine tasks and gain valuable insights to make data-driven decisions faster.
          </CardContent>
        </Card>
      </div>

      {/* ROI Calculator */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>ROI Calculator</CardTitle>
          <CardDescription>Estimate your potential savings with InventoryAI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="inventory-size">Number of SKUs</Label>
              <Input
                id="inventory-size"
                type="number"
                value={inventorySize}
                onChange={(e) => setInventorySize(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="monthly-revenue">Monthly Revenue ($)</Label>
              <Input
                id="monthly-revenue"
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Estimated Annual Savings: ${calculateROI()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Testimonials */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>What Our Customers Say</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <blockquote className="border-l-4 border-primary pl-4 italic">
              "InventoryAI has revolutionized our inventory management. We've reduced stockouts by 75% and improved our cash flow significantly."
              <footer className="text-right mt-2">- Jane Doe, CEO of E-commerce Express</footer>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              "The AI-powered forecasting is a game-changer. We're now always prepared for seasonal demand fluctuations."
              <footer className="text-right mt-2">- John Smith, Inventory Manager at TechGadgets</footer>
            </blockquote>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the free trial work?</AccordionTrigger>
              <AccordionContent>
                Our 14-day free trial gives you full access to all features of the Standard plan. No credit card required to start.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I change plans later?</AccordionTrigger>
              <AccordionContent>
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there a setup fee?</AccordionTrigger>
              <AccordionContent>
                No, there are no setup fees for any of our plans. You only pay the advertised price for your chosen plan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How secure is my data?</AccordionTrigger>
              <AccordionContent>
                We use industry-standard encryption and security practices to keep your data safe. All data is stored in secure, SOC 2 compliant data centers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2" />
            Secure Payment Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>We use industry-standard SSL encryption to ensure your payment information is always secure. Our payment processing is PCI DSS compliant for your peace of mind.</p>
        </CardContent>
      </Card>

      {/* Live Chat */}
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-full w-16 h-16 flex items-center justify-center">
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}