import { Link } from "wouter";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";

function CartContent() {
  const { items, updateQuantity, removeItem, clearCart, itemCount, total, isLoading } = useCart();

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const shippingCost = total >= 3000 ? 0 : 300;
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="font-playfair text-3xl font-bold text-charcoal mb-4">Your cart is empty</h1>
            <p className="text-stone text-lg mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <div className="space-y-4">
              <Link href="/products">
                <Button size="lg" className="bg-gold hover:bg-gold/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">
              Shopping Cart
            </h1>
            <p className="text-stone">
              {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = parseFloat(item.product.salePrice || item.product.price);
              const originalPrice = parseFloat(item.product.price);
              
              return (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <Link href={`/products/${item.product.id}`}>
                        <a className="flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-24 h-32 object-cover rounded-lg"
                          />
                        </a>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.id}`}>
                          <a>
                            <h3 className="font-semibold text-lg text-charcoal hover:text-gold transition-colors line-clamp-2">
                              {item.product.name}
                            </h3>
                          </a>
                        </Link>
                        <p className="text-stone mt-1">
                          Size: {item.size} • Color: {item.color}
                        </p>
                        <p className="text-sm text-stone mt-1">
                          {item.product.fabric}
                        </p>

                        {/* Mobile: Price and Actions */}
                        <div className="mt-4 sm:hidden">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-lg font-bold text-charcoal">
                                Rs. {(price * item.quantity).toLocaleString()}
                              </span>
                              {item.product.salePrice && (
                                <div className="text-sm text-stone line-through">
                                  Rs. {(originalPrice * item.quantity).toLocaleString()}
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={isLoading}
                              className="text-stone hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={isLoading}
                                className="px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-l border-r border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={isLoading}
                                className="px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop: Price and Actions */}
                      <div className="hidden sm:flex flex-col items-end space-y-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-charcoal">
                            Rs. {(price * item.quantity).toLocaleString()}
                          </div>
                          {item.product.salePrice && (
                            <div className="text-sm text-stone line-through">
                              Rs. {(originalPrice * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={isLoading}
                              className="px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-l border-r border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={isLoading}
                              className="px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isLoading}
                            className="text-stone hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Clear Cart */}
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                onClick={handleClearCart}
                disabled={isLoading}
                className="text-stone hover:text-red-500"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-charcoal mb-6">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone">Subtotal ({itemCount} items)</span>
                    <span className="text-charcoal">Rs. {total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-stone">Shipping</span>
                    <span className={shippingCost === 0 ? "text-sage font-semibold" : "text-charcoal"}>
                      {shippingCost === 0 ? "Free" : `Rs. ${shippingCost}`}
                    </span>
                  </div>
                  
                  {total < 3000 && (
                    <div className="text-sm text-stone">
                      <Badge variant="outline" className="mb-2">
                        Add Rs. {(3000 - total).toLocaleString()} more for free shipping
                      </Badge>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-charcoal">Total</span>
                    <span className="text-charcoal">Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Link href="/checkout">
                    <Button size="lg" className="w-full bg-gold hover:bg-gold/90">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="text-center">
                    <Link href="/products">
                      <a className="text-sm text-stone hover:text-gold transition-colors">
                        or Continue Shopping
                      </a>
                    </Link>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8 pt-6 border-t space-y-3">
                  <div className="flex items-center text-sm text-stone">
                    <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                    Free shipping on orders over Rs. 3,000
                  </div>
                  <div className="flex items-center text-sm text-stone">
                    <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                    14-day return policy
                  </div>
                  <div className="flex items-center text-sm text-stone">
                    <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                    Secure payment options
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Cart() {
  return (
    <CartProvider>
      <WishlistProvider>
        <CartContent />
      </WishlistProvider>
    </CartProvider>
  );
}
