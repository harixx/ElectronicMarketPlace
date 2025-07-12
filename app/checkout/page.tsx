import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">
            Checkout
          </h1>
          <p className="text-stone text-lg">
            Complete your order with secure payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl text-charcoal mb-4">
              Shipping Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-stone/30 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-stone/30 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-stone/30 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Address
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-stone/30 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                  rows={3}
                  placeholder="Enter your complete address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-stone/30 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-stone/30 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg text-charcoal mb-4">
                Payment Method
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 border border-stone/30 rounded-md">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="mr-3"
                    defaultChecked
                  />
                  <span className="text-charcoal">Cash on Delivery</span>
                </div>
                <div className="flex items-center p-3 border border-stone/30 rounded-md">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    className="mr-3"
                  />
                  <span className="text-charcoal">Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl text-charcoal mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-stone">Subtotal</span>
                <span className="text-charcoal">Rs. 0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone">Shipping</span>
                <span className="text-charcoal">Rs. 0</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-charcoal">Total</span>
                  <span className="text-charcoal">Rs. 0</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-gold hover:bg-gold/90 text-black py-3">
              Place Order
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}