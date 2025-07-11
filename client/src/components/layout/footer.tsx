import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-playfair text-2xl font-bold mb-4">ELORA</h3>
            <p className="text-gray-300 mb-6">
              Premium loungewear and nightwear designed for the modern woman who values comfort and elegance.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gold p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gold p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gold p-2">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/products">
                  <a className="hover:text-gold transition-colors">All Products</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=silk">
                  <a className="hover:text-gold transition-colors">Silk Collection</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=linen">
                  <a className="hover:text-gold transition-colors">Linen Loungewear</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=cotton">
                  <a className="hover:text-gold transition-colors">Cotton Essentials</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Care Instructions</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span>+92-311-555-0610</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span>hello@elora.com.pk</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1" />
                <span>Lahore, Punjab<br />Pakistan</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-3" />
                <span>9 AM - 6:30 PM PKT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-semibold text-lg mb-4">Stay in the Loop</h4>
            <p className="text-gray-300 mb-6">Get updates on new collections and exclusive offers</p>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-600 text-white"
              />
              <Button className="bg-gold hover:bg-gold/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h4 className="font-semibold text-lg mb-4 text-center">Payment Methods</h4>
          <div className="flex justify-center items-center space-x-6 text-gray-300 text-sm">
            <span>Cash on Delivery</span>
            <span>Bank Transfer</span>
            <span>JazzCash</span>
            <span>EasyPaisa</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-300">
          <p>&copy; 2025 Elora. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
