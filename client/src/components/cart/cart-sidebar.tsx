import { Link } from "wouter";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, itemCount, total, isLoading } = useCart();

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

  const shippingCost = total >= 3000 ? 0 : 300;
  const finalTotal = total + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader className="pb-6 border-b">
          <SheetTitle className="flex items-center justify-between">
            <span>Shopping Cart ({itemCount})</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products">
              <Button onClick={onClose}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                {items.map((item) => {
                  const price = parseFloat(item.product.salePrice || item.product.price);
                  return (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Link href={`/products/${item.product.id}`}>
                        <a onClick={onClose}>
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-24 object-cover rounded-lg"
                          />
                        </a>
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.id}`}>
                          <a onClick={onClose}>
                            <h3 className="font-medium text-sm text-charcoal line-clamp-2 hover:text-gold transition-colors">
                              {item.product.name}
                            </h3>
                          </a>
                        </Link>
                        <p className="text-xs text-stone mt-1">
                          Size: {item.size}, Color: {item.color}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-6 h-6 p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={isLoading}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-6 h-6 p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={isLoading}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold text-sm text-charcoal">
                              Rs. {(price * item.quantity).toLocaleString()}
                            </p>
                            {item.product.salePrice && (
                              <p className="text-xs text-stone line-through">
                                Rs. {(parseFloat(item.product.price) * item.quantity).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-stone hover:text-red-500 p-1"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t pt-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-stone">Subtotal:</span>
                  <span className="text-charcoal">Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone">Shipping:</span>
                  <span className={shippingCost === 0 ? "text-sage font-semibold" : "text-charcoal"}>
                    {shippingCost === 0 ? "Free" : `Rs. ${shippingCost}`}
                  </span>
                </div>
                {total < 3000 && (
                  <div className="text-xs text-stone">
                    Add Rs. {(3000 - total).toLocaleString()} more for free shipping
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span className="text-charcoal">Total:</span>
                  <span className="text-charcoal">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link href="/checkout">
                  <Button className="w-full bg-gold hover:bg-gold/90 text-white" onClick={onClose}>
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="outline" className="w-full" onClick={onClose}>
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
