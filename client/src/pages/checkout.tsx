import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ArrowLeft, CreditCard, Truck, Phone, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter a complete address"),
  city: z.string().min(2, "Please enter your city"),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(["cod", "bank-transfer", "jazzcash", "easypaisa"], {
    required_error: "Please select a payment method",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function CheckoutContent() {
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total, clearCart, itemCount } = useCart();
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "cod",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: { order: any; items: any[] }) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: (order) => {
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id} has been confirmed.`,
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const shippingCost = total >= 3000 ? 0 : 300;
  const finalTotal = total + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        ...data,
        subtotal: total.toString(),
        shippingCost: shippingCost.toString(),
        total: finalTotal.toString(),
      };

      const orderItems = items.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: (parseFloat(item.product.salePrice || item.product.price) * item.quantity).toString(),
      }));

      await createOrderMutation.mutateAsync({
        order: orderData,
        items: orderItems,
      });
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when your order arrives",
      icon: DollarSign,
    },
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      description: "Direct bank transfer",
      icon: CreditCard,
    },
    {
      id: "jazzcash",
      name: "JazzCash",
      description: "Mobile wallet payment",
      icon: Phone,
    },
    {
      id: "easypaisa",
      name: "EasyPaisa",
      description: "Mobile wallet payment",
      icon: Phone,
    },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-playfair text-3xl font-bold text-charcoal mb-4">Your cart is empty</h1>
            <p className="text-stone text-lg mb-8">
              Please add items to your cart before proceeding to checkout.
            </p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90">
              <Link href="/products">
                <a>Continue Shopping</a>
              </Link>
            </Button>
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
              Checkout
            </h1>
            <p className="text-stone">
              Complete your order information below
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/cart">
              <a className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </a>
            </Link>
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        1
                      </span>
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +92-300-1234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        2
                      </span>
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address, building, apartment" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter postal code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        3
                      </span>
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="space-y-3"
                            >
                              {paymentMethods.map((method) => (
                                <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                  <RadioGroupItem value={method.id} id={method.id} />
                                  <div className="flex items-center space-x-3 flex-1">
                                    <method.icon className="w-5 h-5 text-stone" />
                                    <div>
                                      <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                        {method.name}
                                      </Label>
                                      <p className="text-sm text-stone">{method.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {items.map((item) => {
                        const price = parseFloat(item.product.salePrice || item.product.price);
                        return (
                          <div key={item.id} className="flex items-center space-x-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-charcoal line-clamp-1">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-stone">
                                {item.size} • {item.color}
                              </p>
                              <p className="text-xs text-stone">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-semibold text-charcoal">
                              Rs. {(price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone">Subtotal ({itemCount} items)</span>
                        <span className="text-charcoal">Rs. {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone">Shipping</span>
                        <span className={shippingCost === 0 ? "text-sage font-semibold" : "text-charcoal"}>
                          {shippingCost === 0 ? "Free" : `Rs. ${shippingCost}`}
                        </span>
                      </div>
                      {total < 3000 && (
                        <div className="text-xs text-stone">
                          <Badge variant="outline" className="text-xs">
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

                    {/* Place Order Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gold hover:bg-gold/90 mt-6"
                      disabled={isProcessing || createOrderMutation.isPending}
                    >
                      {isProcessing || createOrderMutation.isPending ? (
                        "Processing Order..."
                      ) : (
                        `Place Order • Rs. ${finalTotal.toLocaleString()}`
                      )}
                    </Button>

                    {/* Security Note */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-sm text-stone">
                        <Truck className="w-4 h-4 mr-2" />
                        <span>Secure checkout • Free shipping on orders over Rs. 3,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <Footer />
    </div>
  );
}

export default function Checkout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <CheckoutContent />
      </WishlistProvider>
    </CartProvider>
  );
}
