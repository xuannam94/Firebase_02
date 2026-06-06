
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, Plus, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Orders', value: '1,284', icon: <ShoppingCart className="text-blue-500" />, delta: '+12%' },
    { label: 'Total Revenue', value: '$42,500', icon: <Package className="text-green-500" />, delta: '+8%' },
    { label: 'Product Catalog', value: '142', icon: <LayoutDashboard className="text-purple-500" />, delta: '+3' },
    { label: 'New Inquiries', value: '18', icon: <MessageSquare className="text-orange-500" />, delta: '-2%' },
  ];

  return (
    <div className="container px-4 py-12 space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your corporate store and business inquiries.</p>
        </div>
        <Button className="bg-secondary" asChild>
          <Link href="/admin/products/new"><Plus className="mr-2" size={18} /> Add New Product</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
              {s.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={s.delta.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {s.delta}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>View and manage incoming customer orders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">JD</div>
                  <div>
                    <p className="font-bold text-sm">Order #PM-984{i}</p>
                    <p className="text-xs text-muted-foreground">John Doe • 2 items • $1,450.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">Pending</span>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary" />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/admin/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inquiries & Support</CardTitle>
            <CardDescription>Latest messages from your contact forms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm">Global Tech Solutions Inc.</h4>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">2 hours ago</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">"Hello, we are interested in ordering 50 units of your Premium Business Laptops for our new office..."</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/admin/inquiries">Manage Inquiries</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
