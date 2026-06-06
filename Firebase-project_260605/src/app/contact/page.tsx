
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save to Firestore
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will get back to you shortly.",
      });
    }, 1500);
  };

  return (
    <div className="container px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold font-headline text-primary leading-tight">Get in Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a question about our products or need a custom corporate quote? Our dedicated enterprise support team is here to help.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Our Headquarters</h4>
                <p className="text-muted-foreground">123 Business Avenue, Suite 1000<br />Tech City, San Francisco, CA 94101</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Phone Support</h4>
                <p className="text-muted-foreground">Main Line: +1 (555) 123-4567<br />Support: +1 (555) 765-4321</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email Inquiries</h4>
                <p className="text-muted-foreground">General: hello@primemarketpro.com<br />Sales: sales@primemarketpro.com</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="aspect-video rounded-3xl bg-muted overflow-hidden border-2 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <MapPin size={48} className="mb-2 opacity-20" />
              <p className="font-medium">Interactive Map Placeholder</p>
            </div>
            <img src="https://picsum.photos/seed/map/800/400" alt="Map Location" className="w-full h-full object-cover opacity-50 grayscale" />
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-2xl border">
          {submitted ? (
            <div className="py-24 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-bold">Thank You!</h3>
              <p className="text-muted-foreground text-lg">Your inquiry has been successfully submitted. One of our corporate representatives will contact you within 24 business hours.</p>
              <Button onClick={() => setSubmitted(false)} variant="outline">Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-3xl font-bold font-headline mb-8">Send an Inquiry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@company.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Inquiry Subject</Label>
                <Input id="subject" placeholder="e.g. Bulk Order Quote" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="How can we help your business?" className="min-h-[150px]" required />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 shadow-md" disabled={loading}>
                {loading ? "Sending..." : "Submit Inquiry"} <Send className="ml-2" size={18} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
