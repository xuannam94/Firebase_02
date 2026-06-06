
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CheckCircle2, ShoppingBag, Award, Zap, Users } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl;
  
  const featuredProducts = [
    { id: '1', name: 'Premium Business Laptop', price: 1299.99, image: 'https://picsum.photos/seed/laptop/600/600', cat: 'Electronics' },
    { id: '2', name: 'Ergonomic Office Chair', price: 349.50, image: 'https://picsum.photos/seed/chair/600/600', cat: 'Furniture' },
    { id: '3', name: 'Noise-Cancelling Headphones', price: 299.99, image: 'https://picsum.photos/seed/headphones/600/600', cat: 'Accessories' },
    { id: '4', name: 'Smart Desk Lamp', price: 89.00, image: 'https://picsum.photos/seed/lamp/600/600', cat: 'Accessories' },
  ];

  const values = [
    { icon: <Award className="w-8 h-8 text-secondary" />, title: "Quality Excellence", desc: "We source only the highest grade materials and components for our products." },
    { icon: <Zap className="w-8 h-8 text-secondary" />, title: "Innovation First", desc: "Staying ahead of tech trends to bring you the most modern corporate tools." },
    { icon: <Users className="w-8 h-8 text-secondary" />, title: "Customer Centric", desc: "Your success is our mission. Dedicated support for every single client." },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Corporate Hero" 
            className="w-full h-full object-cover brightness-50"
            data-ai-hint="corporate office"
          />
        </div>
        <div className="container relative z-10 px-4 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight font-headline">
              Empowering Modern <span className="text-secondary">Enterprise</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 font-light">
              Premium solutions and high-end electronics tailored for corporate excellence and productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white h-14 px-8 text-lg" asChild>
                <Link href="/shop">Browse Catalog <ShoppingBag className="ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white h-14 px-8 text-lg" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold font-headline text-primary">About PrimeMarket Pro</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2010, we've transformed from a local electronics supplier to a global powerhouse in corporate solutions. We understand that in today's fast-paced world, businesses need more than just products; they need reliability and innovation.
            </p>
            <ul className="space-y-3">
              {['Global delivery to 50+ countries', '24/7 Enterprise-level support', 'Certified high-performance hardware'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary w-5 h-5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="link" className="p-0 h-auto text-lg text-secondary group" asChild>
              <Link href="/about">Learn more about us <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src="https://picsum.photos/seed/office-team/800/600" alt="Team" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-24">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-headline mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that drive every decision we make and every product we deliver.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-background p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
                <div className="flex justify-center mb-6">{v.icon}</div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Hand-picked selections for your business workspace.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className="group space-y-4">
              <div className="aspect-square rounded-xl bg-muted overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">{p.cat}</span>
                <h3 className="font-bold text-lg leading-tight mt-1 group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-xl font-semibold mt-2">${p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4">
        <div className="bg-primary rounded-3xl p-12 text-center text-primary-foreground space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl font-bold font-headline">Ready to Upgrade Your Enterprise?</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">Contact our sales team today for custom volume pricing and enterprise support packages.</p>
            <div className="pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg font-bold" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
