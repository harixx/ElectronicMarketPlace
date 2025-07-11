import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, User, Heart, ShoppingBag, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navigation = [
    { name: "Nighties", href: "/products?category=nightdress" },
    { name: "Sets", href: "/products?category=sets" },
    { name: "Robes", href: "/products?category=robes" },
    { name: "Loungewear", href: "/products?category=loungewear" },
    { name: "Sale", href: "/products?collection=sale" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar - Trust & Promo Bar */}
        <div className="bg-sage/20 border-b border-sage/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 text-sm text-charcoal">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-sage" />
                  <span className="font-medium">Free shipping on orders over Rs.3,000</span>
                </div>
                <div className="hidden md:flex items-center">
                  <span className="w-2 h-2 bg-sage rounded-full mr-2"></span>
                  <span>30-day returns</span>
                </div>
                <div className="hidden lg:flex items-center">
                  <span className="w-2 h-2 bg-sage rounded-full mr-2"></span>
                  <span>Secure payment options</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs font-medium">PKR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="space-y-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="space-y-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block py-2 text-charcoal hover:text-gold transition-colors w-full text-left"
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/">
              <a className="flex-1 md:flex-none">
                <h1 className="font-playfair text-3xl font-bold text-charcoal tracking-wide">
                  ELORA
                  <span className="text-xs font-inter font-light tracking-normal block text-stone">
                    Premium Loungewear
                  </span>
                </h1>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className={`text-charcoal hover:text-gold transition-colors font-medium ${
                    location === item.href ? 'text-gold' : ''
                  }`}>
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Search nightwear, sets, robes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 pr-10 border-sage/30 focus:border-gold"
                />
                <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gold hover:bg-gold/90">
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              {/* User Account */}
              <Button variant="ghost" size="sm" className="hover:bg-sage/20">
                <User className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="relative hover:bg-sage/20">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blush text-charcoal">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>

              {/* Shopping Cart */}
              <Button variant="ghost" size="sm" className="relative hover:bg-sage/20" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gold text-white">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Search Bar */}
      {isMobile && (
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-sage/20 px-4 py-2">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search nightwear, sets, robes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 border-sage/30 focus:border-gold"
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gold hover:bg-gold/90">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
