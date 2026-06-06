
"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';

export default function Header() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-headline text-primary">PrimeMarket</span>
              <span className="text-2xl font-light text-secondary">Pro</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center mr-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px]" variant="secondary">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Your Shopping Cart</SheetTitle>
                </SheetHeader>
                <CartDrawer />
              </SheetContent>
            </Sheet>

            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="text-left">Navigation</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map(link => (
                      <Link 
                        key={link.href} 
                        href={link.href} 
                        className="text-lg font-medium py-2 border-b"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link 
                      href="/admin" 
                      className="text-lg font-medium py-2 border-b"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
        <ShoppingCart className="h-16 w-16 text-muted-foreground opacity-20" />
        <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
        <Button asChild variant="outline">
          <Link href="/shop">Bắt đầu mua sắm</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex gap-4 items-start">
            <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.name}</h4>
              <p className="text-sm text-primary font-semibold">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border rounded-md">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-xs">-</button>
                  <span className="px-2 text-xs font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-xs">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-xs text-destructive hover:underline">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-muted/50 border-t space-y-4">
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full h-12 text-lg" asChild>
          <Link href="/checkout">Checkout Now</Link>
        </Button>
      </div>
    </div>
  );
}
