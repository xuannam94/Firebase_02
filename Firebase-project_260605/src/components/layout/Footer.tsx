
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-headline">PrimeMarket</span>
              <span className="text-2xl font-light opacity-80">Pro</span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Leading the way in premium corporate solutions and high-quality electronic products for modern businesses.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-secondary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-secondary transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-secondary transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-secondary transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm opacity-70">
              <li><Link href="/" className="hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link href="/shop" className="hover:opacity-100 transition-opacity">Shop All Products</Link></li>
              <li><Link href="/about" className="hover:opacity-100 transition-opacity">About Our Company</Link></li>
              <li><Link href="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-4 text-sm opacity-70">
              <li><Link href="/shop?cat=electronics" className="hover:opacity-100 transition-opacity">Electronics</Link></li>
              <li><Link href="/shop?cat=furniture" className="hover:opacity-100 transition-opacity">Office Furniture</Link></li>
              <li><Link href="/shop?cat=accessories" className="hover:opacity-100 transition-opacity">Accessories</Link></li>
              <li><Link href="/shop?cat=software" className="hover:opacity-100 transition-opacity">Business Software</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm opacity-70">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5" />
                <span>123 Business Avenue, Tech City, 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} />
                <span>support@primemarketpro.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-50">
          <p>© {new Date().getFullYear()} PrimeMarket Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
