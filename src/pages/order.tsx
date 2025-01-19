import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination"
import { Search, Plus, Edit, Package, Calendar } from 'lucide-react'
import Sidebar from '../components/ui/HeaderandSideBar'

// Mock data for orders
const orderData = [
  { 
    id: 1, 
    orderNumber: 'ORD001',
    customerName: 'John Smith',
    date: '2025-01-15',
    status: 'Processing',
    total: 249.97,
    items: [
      { id: 1, name: 'Product A', quantity: 2, price: 19.99 },
      { id: 2, name: 'Product B', quantity: 1, price: 29.99 }
    ]
  },
  // ... more orders
]

interface OrderProduct {
  id?: string;
  name?: string;
  quantity?: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
  items: { id: number; name: string; quantity: number; price: number; }[];
}

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([])

  // Filter orders based on search term
  const filteredOrders = orderData.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  
  return (
    <Sidebar>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        
        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order number or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Create Order</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Enter the order details and add products.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">
                    Customer Name
                  </Label>
                  <Input id="customer" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Products
                  </Label>
                  <div className="col-span-3 space-y-2">
                    {selectedProducts.map((product, index) => (
                      <div key={index} className="flex gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product-a">Product A</SelectItem>
                            <SelectItem value="product-b">Product B</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="Qty" className="w-24" />
                        <Button variant="ghost" size="sm" onClick={() => {
                          const newProducts = [...selectedProducts]
                          newProducts.splice(index, 1)
                          setSelectedProducts(newProducts)
                        }}>Remove</Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setSelectedProducts([...selectedProducts, { id: '', name: '', quantity: 0 }])}>
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage and track all orders here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
                </PaginationItem>
                {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }, (_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(Math.min(Math.ceil(filteredOrders.length / itemsPerPage), currentPage + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>

        {/* Recent Orders Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>Quick statistics about orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Processing</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Today's Orders</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest order updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #ORD001 shipped</p>
                    <p className="text-sm text-gray-500">2 minutes ago</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">New order #ORD002</p>
                    <p className="text-sm text-gray-500">15 minutes ago</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Sidebar>
  )
}