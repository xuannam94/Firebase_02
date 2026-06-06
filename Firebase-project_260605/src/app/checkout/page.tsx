
"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="container max-w-2xl px-4 py-24 text-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-headline">Order Placed Successfully!</h1>
          <p className="text-muted-foreground text-lg">Thank you for your purchase. Your order #PM-9842 is being processed.</p>
        </div>
        <div className="pt-8">
          <Button size="lg" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">Please add some items to your cart before proceeding to checkout.</p>
        <Button asChild>
          <Link href="/shop">Go to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-headline">Checkout</h1>
        <p className="text-muted-foreground">Complete your order details below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center">1</div>
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" placeholder="123 Corporate St, Tech Suite 400" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="San Francisco" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" placeholder="94101" required />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center">2</div>
                Payment Method
              </h2>
              <RadioGroup defaultValue="credit-card" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="credit-card" id="cc" className="peer sr-only" />
                  <Label htmlFor="cc" className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                    <CreditCard className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Credit Card</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                  <Label htmlFor="paypal" className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                    <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.067 8.478c.492.88.556 2.014.307 3.292-.572 2.934-2.456 4.945-5.283 5.355l-.517.075-.409 2.597c-.031.196-.201.341-.4.341H9.864c-.25 0-.441-.225-.399-.472l1.323-7.792c.042-.247.233-.422.483-.422h3.454c1.157 0 2.083-.26 2.656-.74.331-.277.538-.646.618-1.1.042-.236.064-.492.064-.766 0-.256-.019-.502-.056-.738l.056-.03z"/></svg>
                    <span className="text-sm font-medium">PayPal</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                  <Label htmlFor="bank" className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                    <Truck className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Purchase Order</span>
                  </Label>
                </div>
              </RadioGroup>
            </section>

            <Button type="submit" size="lg" className="w-full h-14 text-xl font-bold bg-secondary hover:bg-secondary/90 shadow-lg">
              Place Order (${(totalPrice + 15).toFixed(2)})
            </Button>
          </form>
        </div>

        <div>
          <Card className="sticky top-24 shadow-md overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary">{item.quantity}x</span>
                      <span className="text-muted-foreground truncate max-w-[140px]">{item.name}</span>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$15.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (Estimated)</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(totalPrice + 15).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted p-6 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="text-green-600" size={16} /> Secure encrypted checkout
              </div>
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                By clicking "Place Order", you agree to PrimeMarket Pro's Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
