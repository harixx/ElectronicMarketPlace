import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#2c1810] via-[#4d0404] to-[#1a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gold mb-2">ELORA</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Premium loungewear and nightwear crafted from the finest silk, linen, and cotton. 
                  Designed for the modern woman who values comfort and elegance.
                </p>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="text-stone hover:text-gold transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-stone hover:text-gold transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-stone hover:text-gold transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="text-stone hover:text-gold transition-colors">Shop All</Link></li>
                <li><Link href="/products?collection=new-arrivals" className="text-stone hover:text-gold transition-colors">New Arrivals</Link></li>
                <li><Link href="/products?collection=silk-collection" className="text-stone hover:text-gold transition-colors">Silk Collection</Link></li>
                <li><Link href="/products?collection=linen-collection" className="text-stone hover:text-gold transition-colors">Linen Loungewear</Link></li>
                <li><Link href="/products?collection=cotton-essentials" className="text-stone hover:text-gold transition-colors">Cotton Essentials</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gold">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-stone hover:text-gold transition-colors">Size Guide</Link></li>
                <li><Link href="#" className="text-stone hover:text-gold transition-colors">Shipping Info</Link></li>
                <li><Link href="#" className="text-stone hover:text-gold transition-colors">Returns & Exchanges</Link></li>
                <li><Link href="#" className="text-stone hover:text-gold transition-colors">Care Instructions</Link></li>
                <li><Link href="#" className="text-stone hover:text-gold transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gold">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gold" />
                  <span className="text-stone">+92 300 1234567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gold" />
                  <span className="text-stone">hello@elora.pk</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span className="text-stone">Lahore, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gold/30 pt-8">
            {/* Payment Methods */}
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-6 text-gold text-center">Secure Payment Options</h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                <div className="flex items-center justify-center px-6 py-3 rounded-lg border border-gold/20 hover:bg-white/10 transition-all">
                  <span className="text-white text-sm">💳 Cash on Delivery</span>
                </div>
                <div className="flex items-center justify-center px-6 py-3 rounded-lg border border-gold/20 hover:bg-white/10 transition-all">
                  <span className="text-white text-sm">🏦 Bank Transfer</span>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gold/30 pt-8 flex flex-col md:flex-row justify-between items-center text-stone">
              <div className="text-center md:text-left">
                <p>&copy; {currentYear} ELORA. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
                <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-gold transition-colors">Shipping Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}