
"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const ALL_PRODUCTS = [
  { id: '1', name: 'Premium Business Laptop', price: 1299.99, image: 'https://picsum.photos/seed/laptop/600/600', category: 'Electronics', stock: 15 },
  { id: '2', name: 'Ergonomic Office Chair', price: 349.50, image: 'https://picsum.photos/seed/chair/600/600', category: 'Furniture', stock: 24 },
  { id: '3', name: 'Noise-Cancelling Headphones', price: 299.99, image: 'https://picsum.photos/seed/headphones/600/600', category: 'Electronics', stock: 42 },
  { id: '4', name: 'Smart Desk Lamp', price: 89.00, image: 'https://picsum.photos/seed/lamp/600/600', category: 'Accessories', stock: 10 },
  { id: '5', name: 'Executive Oak Desk', price: 899.00, image: 'https://picsum.photos/seed/desk/600/600', category: 'Furniture', stock: 5 },
  { id: '6', name: 'Dual 4K Monitor Stand', price: 159.99, image: 'https://picsum.photos/seed/stand/600/600', category: 'Accessories', stock: 18 },
  { id: '7', name: 'Wireless Mechanical Keyboard', price: 179.00, image: 'https://picsum.photos/seed/keyboard/600/600', category: 'Electronics', stock: 30 },
  { id: '8', name: 'Professional Web Camera', price: 129.50, image: 'https://picsum.photos/seed/webcam/600/600', category: 'Electronics', stock: 50 },
];

export default function Shop() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || p.category.toLowerCase() === category.toLowerCase();
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // default
      });
  }, [searchTerm, category, sortBy]);

  return (
    <div className="container px-4 py-12">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-headline">Explore Our Store</h1>
          <p className="text-muted-foreground">High-performance tools for your growing business.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 h-11" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[160px] h-11">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-11">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <div key={p.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1">
                <Link href={`/shop/${p.id}`} className="block relative aspect-square overflow-hidden bg-muted">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-background/80 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {p.category}
                    </span>
                  </div>
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <Link href={`/shop/${p.id}`}>
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                  </Link>
                  <p className="text-2xl font-bold text-primary mt-auto">${p.price.toFixed(2)}</p>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => addToCart({ ...p, imageUrl: p.image })}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/shop/${p.id}`}>
                        <Search className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <Search className="w-10 h-10 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-8">Try adjusting your filters or search terms.</p>
            <Button onClick={() => { setSearchTerm(''); setCategory('all'); }}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
