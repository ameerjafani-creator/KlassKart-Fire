
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  TrendingUp, 
  ShoppingBag, 
  CheckCircle, 
  Clock,
  ArrowUpRight,
  Plus,
  Search,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    activeUsers: 42,
    conversionRate: "3.2%"
  });

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      
      const sales = ordersData.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
      setStats(prev => ({
        ...prev,
        totalSales: sales,
        totalOrders: ordersData.length
      }));
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const renderDashboard = () => (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl border-none premium-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalSales.toLocaleString()}</div>
            <p className="text-[10px] text-green-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none premium-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-[10px] text-blue-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none premium-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-[10px] text-orange-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Real-time tracking active
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none premium-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Conversion</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}</div>
            <p className="text-[10px] text-purple-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Optimizing for Q3
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-3xl border-none premium-shadow bg-white">
          <CardHeader className="px-8 pt-8">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
              <Button variant="link" onClick={() => setActiveTab("orders")} className="text-brand-red text-xs p-0">View All Orders</Button>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] uppercase font-bold">Order ID</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold">Status</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold">Amount</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 10).map((order) => (
                    <TableRow key={order.id} className="group hover:bg-brand-offwhite/50 transition-colors">
                      <TableCell className="font-medium text-xs">{order.orderId}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-0.5 rounded-full text-[10px]">
                          {order.status || 'paid'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-xs">₹{order.totalAmount?.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-[10px]">
                        {order.createdAt?.toDate?.()?.toLocaleDateString() || 'Today'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                        No orders recorded yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-3xl border-none premium-shadow bg-brand-charcoal text-white">
            <CardHeader>
              <CardTitle className="text-lg">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 uppercase tracking-widest">Database Latency</span>
                  <span className="text-green-500 font-bold">12ms</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full">
                  <div className="bg-green-500 h-full w-[12%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 uppercase tracking-widest">AI Flow Capacity</span>
                  <span className="text-orange-500 font-bold">88%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full">
                  <div className="bg-orange-500 h-full w-[88%] rounded-full"></div>
                </div>
              </div>
              <Button className="w-full bg-brand-red hover:bg-brand-red/90 rounded-xl mt-4">
                Run Optimization
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <Card className="rounded-3xl border-none premium-shadow bg-white">
      <CardHeader className="flex flex-row items-center justify-between p-8">
        <div>
          <CardTitle className="text-2xl font-bold">Inventory Management</CardTitle>
          <p className="text-sm text-muted-foreground">Manage your product listings and stock levels</p>
        </div>
        <Button className="bg-brand-red hover:bg-brand-red/90 rounded-xl gap-2">
          <Plus size={18} /> Add Product
        </Button>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10 rounded-xl border-muted" />
          </div>
          <Button variant="outline" className="rounded-xl">Filters</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, name: "Ultra Smartphone X12", cat: "Mobiles", price: 45999, stock: 12, status: "Active" },
              { id: 2, name: "Luxury Analog Watch", cat: "Accessories", price: 8999, stock: 0, status: "Out of Stock" },
              { id: 3, name: "Noise Cancelling Headphones", cat: "Electronics", price: 15999, stock: 45, status: "Active" }
            ].map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-muted-foreground">{p.cat}</TableCell>
                <TableCell className="font-bold">₹{p.price.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={p.stock === 0 ? "text-brand-red font-bold" : ""}>
                    {p.stock} units
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={p.status === "Active" ? "default" : "destructive"} className="rounded-full px-3">
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><MoreVertical size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderOrders = () => (
    <Card className="rounded-3xl border-none premium-shadow bg-white">
      <CardHeader className="p-8">
        <CardTitle className="text-2xl font-bold">All Orders</CardTitle>
        <p className="text-sm text-muted-foreground">Manage and track customer purchases</p>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.shippingAddress?.name || "Guest User"}</TableCell>
                <TableCell>{order.items?.length || 0} items</TableCell>
                <TableCell className="font-bold">₹{order.totalAmount?.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {order.createdAt?.toDate?.()?.toLocaleString() || "N/A"}
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none rounded-full">
                    {order.status || "Paid"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderCustomers = () => (
    <Card className="rounded-3xl border-none premium-shadow bg-white">
      <CardHeader className="p-8">
        <CardTitle className="text-2xl font-bold">Customer Directory</CardTitle>
        <p className="text-sm text-muted-foreground">View and manage user accounts</p>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "John Doe", email: "john@example.com", orders: 5, date: "2024-02-15", status: "Active" },
              { name: "Sarah Smith", email: "sarah.s@gmail.com", orders: 2, date: "2024-03-01", status: "Active" },
              { name: "Anonymous", email: "guest@store.com", orders: 1, date: "2024-03-05", status: "Guest" }
            ].map((c, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.orders}</TableCell>
                <TableCell className="text-muted-foreground">{c.date}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={c.status === "Guest" ? "secondary" : "default"} className="rounded-full">
                    {c.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-brand-offwhite flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-charcoal text-white flex flex-col p-6 space-y-8 hidden md:flex sticky top-0 h-screen">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center">
            <span className="text-white font-headline text-2xl font-bold">K</span>
          </div>
          <span className="font-headline text-xl font-bold tracking-tighter">KLASS ADMIN</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full justify-start gap-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("products")}
            className={`w-full justify-start gap-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Package size={20} /> Products
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("orders")}
            className={`w-full justify-start gap-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <ShoppingBag size={20} /> Orders
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("customers")}
            className={`w-full justify-start gap-3 rounded-xl transition-all ${activeTab === 'customers' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Users size={20} /> Customers
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <Settings size={20} /> Settings
          </Button>
        </nav>

        <Button variant="ghost" onClick={handleLogout} className="justify-start gap-3 text-gray-400 hover:text-brand-red hover:bg-brand-red/10 mt-auto rounded-xl">
          <LogOut size={20} /> Sign Out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold text-brand-charcoal capitalize">{activeTab}</h1>
            <p className="text-muted-foreground">Welcome back, Jafani. Here's what's happening.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Jafani</p>
              <p className="text-xs text-muted-foreground">System Administrator</p>
            </div>
            <div className="w-12 h-12 bg-muted rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" />
            </div>
          </div>
        </header>

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "customers" && renderCustomers()}
      </main>
    </div>
  );
}
