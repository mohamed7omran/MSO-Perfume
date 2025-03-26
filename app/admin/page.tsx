"use client"

import { useState } from "react"
import { BarChart3, Package, Plus, Search, Settings, ShoppingBag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 space-y-2">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

          <Button
            variant={selectedTab === "dashboard" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedTab("dashboard")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>

          <Button
            variant={selectedTab === "products" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedTab("products")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </Button>

          <Button
            variant={selectedTab === "orders" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedTab("orders")}
          >
            <Package className="mr-2 h-4 w-4" />
            Orders
          </Button>

          <Button
            variant={selectedTab === "customers" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedTab("customers")}
          >
            <Users className="mr-2 h-4 w-4" />
            Customers
          </Button>

          <Button
            variant={selectedTab === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Dashboard */}
          {selectedTab === "dashboard" && <DashboardTab />}

          {/* Products */}
          {selectedTab === "products" && <ProductsTab />}

          {/* Orders */}
          {selectedTab === "orders" && <OrdersTab />}

          {/* Customers */}
          {selectedTab === "customers" && <CustomersTab />}

          {/* Settings */}
          {selectedTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}

// Dashboard Tab Component
function DashboardTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">+4.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
            <CardDescription>Top 5 products by sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Units Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Midnight Orchid</TableCell>
                  <TableCell className="text-right">42</TableCell>
                  <TableCell className="text-right">$5,459.58</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ocean Breeze</TableCell>
                  <TableCell className="text-right">38</TableCell>
                  <TableCell className="text-right">$3,799.62</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Amber Elegance</TableCell>
                  <TableCell className="text-right">27</TableCell>
                  <TableCell className="text-right">$4,049.73</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Velvet Rose</TableCell>
                  <TableCell className="text-right">21</TableCell>
                  <TableCell className="text-right">$2,519.79</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cedar Noir</TableCell>
                  <TableCell className="text-right">18</TableCell>
                  <TableCell className="text-right">$1,619.82</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Products Tab Component
function ProductsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Products</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details to add a new perfume product.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" />
              </div>

              <div className="space-y-2">
                <Label>Fragrance Notes</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="topNotes">Top Notes</Label>
                    <Input id="topNotes" placeholder="Enter top notes" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleNotes">Middle Notes</Label>
                    <Input id="middleNotes" placeholder="Enter middle notes" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baseNotes">Base Notes</Label>
                    <Input id="baseNotes" placeholder="Enter base notes" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input id="image" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="unisex">Unisex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Orders Tab Component
function OrdersTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Orders</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search orders..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Select defaultValue={order.status.toLowerCase()}>
                      <SelectTrigger className="h-8 w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Customers Tab Component
function CustomersTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Customers</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search customers..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Settings Tab Component
function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
          <CardDescription>Manage your store configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input id="storeName" defaultValue="MSO Perfume" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeEmail">Store Email</Label>
            <Input id="storeEmail" defaultValue="contact@msoperfume.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storePhone">Store Phone</Label>
            <Input id="storePhone" defaultValue="+1 (555) 123-4567" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input id="taxRate" defaultValue="7.5" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="shippingMethod">Default Shipping Method</Label>
            <Select defaultValue="standard">
              <SelectTrigger id="shippingMethod">
                <SelectValue placeholder="Select shipping method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Shipping</SelectItem>
                <SelectItem value="express">Express Shipping</SelectItem>
                <SelectItem value="overnight">Overnight Shipping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Sample data
const recentOrders = [
  {
    id: "ORD-12345",
    customer: "John Doe",
    status: "Delivered",
    total: 129.99,
    date: "March 15, 2023",
  },
  {
    id: "ORD-12346",
    customer: "Jane Smith",
    status: "Processing",
    total: 249.98,
    date: "April 2, 2023",
  },
  {
    id: "ORD-12347",
    customer: "Robert Johnson",
    status: "Shipped",
    total: 89.99,
    date: "May 10, 2023",
  },
  {
    id: "ORD-12348",
    customer: "Emily Davis",
    status: "Processing",
    total: 199.99,
    date: "May 15, 2023",
  },
  {
    id: "ORD-12349",
    customer: "Michael Brown",
    status: "Cancelled",
    total: 149.99,
    date: "May 18, 2023",
  },
]

const allOrders = [
  ...recentOrders,
  {
    id: "ORD-12350",
    customer: "Sarah Wilson",
    status: "Delivered",
    date: "March 10, 2023",
    total: 119.99,
  },
  {
    id: "ORD-12351",
    customer: "David Miller",
    status: "Delivered",
    date: "March 5, 2023",
    total: 89.99,
  },
  {
    id: "ORD-12352",
    customer: "Jennifer Taylor",
    status: "Shipped",
    date: "March 1, 2023",
    total: 159.99,
  },
]

const products = [
  {
    id: "1",
    name: "Midnight Orchid",
    category: "Women",
    price: 129.99,
    stock: 42,
  },
  {
    id: "2",
    name: "Ocean Breeze",
    category: "Men",
    price: 99.99,
    stock: 38,
  },
  {
    id: "3",
    name: "Amber Elegance",
    category: "Unisex",
    price: 149.99,
    stock: 27,
  },
  {
    id: "4",
    name: "Velvet Rose",
    category: "Women",
    price: 119.99,
    stock: 21,
  },
  {
    id: "5",
    name: "Cedar Noir",
    category: "Men",
    price: 89.99,
    stock: 18,
  },
  {
    id: "6",
    name: "Golden Citrus",
    category: "Unisex",
    price: 109.99,
    stock: 32,
  },
]

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 3,
    totalSpent: 349.97,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: 2,
    totalSpent: 249.98,
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    orders: 1,
    totalSpent: 89.99,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    orders: 4,
    totalSpent: 499.96,
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    orders: 2,
    totalSpent: 259.98,
  },
]

