import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, User, Heart, ShoppingBag, Phone, Truck, ChevronDown, Instagram, Facebook, MessageCircle } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, navigate] = useLocation();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const isMobile = useIsMobile();

  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navigation = [
    { 
      name: "Collections", 
      href: "/products",
      hasDropdown: true,
      children: [
        { name: "New Arrivals", href: "/products?collection=new-arrivals" },
        { name: "Silk Collection", href: "/products?category=silk" },
        { name: "Cotton Essentials", href: "/products?category=cotton" },
        { name: "Linen Loungewear", href: "/products?category=linen" }
      ]
    },
    { name: "Pajama Sets", href: "/products?category=sets" },
    { name: "Night Robes", href: "/products?category=robes" },
    { name: "Loungewear", href: "/products?category=loungewear" },
    { 
      name: "Sale", 
      href: "/products?collection=sale",
      isSpecial: true 
    },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
      }`}>
        {/* Top Bar - Enhanced with Social Links */}
        <div className="bg-gradient-to-r from-sage/20 to-blush/20 border-b border-sage/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 text-sm text-charcoal">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-sage" />
                  <span className="font-medium">Free shipping on orders over Rs.3,000</span>
                </div>
                <div className="hidden md:flex items-center">
                  <span className="w-2 h-2 bg-sage rounded-full mr-2 animate-pulse"></span>
                  <span>Same day delivery in major cities</span>
                </div>
                <div className="hidden lg:flex items-center">
                  <span className="w-2 h-2 bg-blush rounded-full mr-2"></span>
                  <span>COD & Online payments</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <Instagram className="w-4 h-4 text-charcoal hover:text-gold transition-colors" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <Facebook className="w-4 h-4 text-charcoal hover:text-gold transition-colors" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <MessageCircle className="w-4 h-4 text-charcoal hover:text-gold transition-colors" />
                  </Button>
                </div>
                <div className="text-xs font-medium px-2 py-1 bg-gold/10 rounded">PKR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#fdb51c]">
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

            {/* Logo - Enhanced */}
            <Link href="/">
              <div className="flex-1 md:flex-none cursor-pointer group">
                <h1 className="font-playfair text-3xl font-bold text-charcoal tracking-wide group-hover:text-gold transition-colors">
                  ELORA
                  <span className="text-xs font-inter font-light tracking-normal block group-hover:text-gold/70 transition-colors text-[#ffffff]">
                    Premium Loungewear
                  </span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation - Modern with Hover Effects */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link href={item.href}>
                    <div className={`flex items-center text-charcoal hover:text-gold transition-all duration-200 font-medium cursor-pointer ${
                      location === item.href ? 'text-gold' : ''
                    } ${item.isSpecial ? 'text-gold font-semibold animate-pulse' : ''}`}>
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />}
                      {item.isSpecial && <span className="ml-1 text-xs">🔥</span>}
                    </div>
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && item.children && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link key={child.name} href={child.href}>
                            <div className="block px-4 py-2 text-sm text-charcoal hover:bg-cream hover:text-gold transition-colors cursor-pointer">
                              {child.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
