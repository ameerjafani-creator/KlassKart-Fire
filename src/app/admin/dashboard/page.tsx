
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
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    activeUsers: 42, // Simulated
    conversionRate: "3.2%" // Simulated
  });

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(10));
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

  return (
    <div className="min-h-screen bg-brand-offwhite flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-charcoal text-white flex flex-col p-6 space-y-8 hidden md:flex">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center">
            <span className="text-white font-headline text-2xl font-bold">K</span>
          </div>
          <span className="font-headline text-xl font-bold tracking-tighter">KLASS ADMIN</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-brand-red/10 text-brand-red hover:bg-brand-red/20">
            <LayoutDashboard size={20} /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10">
            <Package size={20} /> Products
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10">
            <ShoppingBag size={20} /> Orders
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10">
            <Users size={20} /> Customers
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10">
            <Settings size={20} /> Settings
          </Button>
        </nav>

        <Button variant="ghost" onClick={handleLogout} className="justify-start gap-3 text-gray-400 hover:text-brand-red hover:bg-brand-red/10 mt-auto">
          <LogOut size={20} /> Sign Out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold text-brand-charcoal">Dashboard</h1>
            <p className="text-muted-foreground">Store performance and operations overview</p>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 rounded-3xl border-none premium-shadow bg-white">
            <CardHeader className="px-8 pt-8">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
                <Button variant="link" className="text-brand-red text-xs">View All Orders</Button>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <ScrollArea className="h-[400px]">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] uppercase font-bold text-muted-foreground border-b border-muted">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted">
                    {orders.length > 0 ? orders.map((order) => (
                      <tr key={order.id} className="text-sm group hover:bg-brand-offwhite/50 transition-colors">
                        <td className="py-5 font-medium">{order.orderId}</td>
                        <td className="py-5">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-0.5 rounded-full text-[10px]">
                            {order.status || 'paid'}
                          </Badge>
                        </td>
                        <td className="py-5 font-bold">₹{order.totalAmount?.toLocaleString()}</td>
                        <td className="py-5 text-muted-foreground text-xs">
                          {order.createdAt?.toDate?.()?.toLocaleDateString() || 'Today'}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-20 text-center text-muted-foreground">
                          <div className="flex flex-col items-center">
                            <Clock className="h-8 w-8 mb-2 opacity-20" />
                            No recent orders found
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions / System Health */}
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

            <Card className="rounded-3xl border-none premium-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Staff Memo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "Summer collection inventory needs updating by Friday. Please verify Cashfree production logs for any anomalies during the weekend sale."
                </p>
                <p className="text-[10px] text-brand-red mt-4 font-bold uppercase tracking-widest">- Management</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
