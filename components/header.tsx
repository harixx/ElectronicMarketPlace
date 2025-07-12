'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-playfair font-bold text-charcoal">
              ELORA
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-charcoal hover:text-gold transition-colors">
              Shop All
            </Link>
            <Link href="/products?collection=new-arrivals" className="text-charcoal hover:text-gold transition-colors">
              New Arrivals
            </Link>
            <Link href="/products?collection=silk-collection" className="text-charcoal hover:text-gold transition-colors">
              Silk Collection
            </Link>
            <Link href="/products?collection=linen-collection" className="text-charcoal hover:text-gold transition-colors">
              Linen
            </Link>
            <Link href="/products?collection=cotton-essentials" className="text-charcoal hover:text-gold transition-colors">
              Cotton
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              href="/products"
              className="block px-3 py-2 text-charcoal hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/products?collection=new-arrivals"
              className="block px-3 py-2 text-charcoal hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/products?collection=silk-collection"
              className="block px-3 py-2 text-charcoal hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Silk Collection
            </Link>
            <Link
              href="/products?collection=linen-collection"
              className="block px-3 py-2 text-charcoal hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Linen
            </Link>
            <Link
              href="/products?collection=cotton-essentials"
              className="block px-3 py-2 text-charcoal hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cotton
            </Link>
            <div className="flex items-center space-x-4 px-3 py-2">
              <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-4 w-4" />
                  {wishlistCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {itemCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}