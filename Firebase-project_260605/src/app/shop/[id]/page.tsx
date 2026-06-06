
"use client";

import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Star } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// Mock data fetch
const getProduct = (id: string) => {
  const products = [
    { 
      id: '1', 
      name: 'Premium Business Laptop', 
      price: 1299.99, 
      image: 'https://picsum.photos/seed/laptop/800/800', 
      category: 'Electronics', 
      stock: 15,
      description: 'The ultimate professional tool for modern enterprises. Featuring the latest processor architecture, stunning high-resolution display, and all-day battery life. Built for productivity and designed to impress.',
      features: ['Intel Core i9 12th Gen', '32GB DDR5 RAM', '1TB NVMe SSD', '14" 4K OLED Touchscreen']
    },
    // ... other products would be here
  ];
  return products.find(p => p.id === id) || products[0];
};

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProduct(resolvedParams.id);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({ ...product, imageUrl: product.image });
  };

  return (
    <div className="container px-4 py-12">
      <Button variant="ghost" className="mb-8 hover:bg-transparent p-0 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors" onClick={() => router.back()}>
        <ArrowLeft size={18} /> Back to results
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-6">
          <div className="aspect-square rounded-3xl overflow-hidden bg-muted shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-primary">
                <img src={`https://picsum.photos/seed/laptop-${i}/200/200`} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-3 py-1">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-sm text-muted-foreground">(48 Customer Reviews)</span>
            </div>
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border">
              <ShieldCheck className="text-secondary" />
              <div className="text-xs">
                <p className="font-bold">2-Year Warranty</p>
                <p className="text-muted-foreground">Full hardware protection</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border">
              <Truck className="text-secondary" />
              <div className="text-xs">
                <p className="font-bold">Free Global Shipping</p>
                <p className="text-muted-foreground">On all orders over $500</p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 h-14 text-lg font-bold" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2" /> Add to Cart
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Stock status: <span className="font-semibold text-green-600">In Stock ({product.stock} units available)</span>
            </p>
          </div>

          <Tabs defaultValue="specs" className="pt-8">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4">Specifications</TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4">Delivery Info</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="pt-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6 text-sm text-muted-foreground space-y-4">
              <p>Standard delivery takes 3-5 business days within the continental US. International shipping rates vary by destination.</p>
              <div className="flex items-center gap-2 text-primary font-medium">
                <RefreshCcw size={16} /> 30-Day Hassle-Free Returns
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
