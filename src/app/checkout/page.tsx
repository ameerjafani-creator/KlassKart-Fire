
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ShieldCheck, CreditCard } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal > 1000 ? subtotal : subtotal + 99;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Cashfree Payment Initiation
    toast({
      title: "Initiating Payment",
      description: "Redirecting to Cashfree secure gateway...",
    });

    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Successful!",
        description: "Your payment was verified and order confirmed.",
      });
      clearCart();
      router.push("/");
    }, 2000);
  };

  if (cart.length === 0) {
    return null; // Should redirect to shop or show empty state handled by cart page
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-headline font-bold mb-12">Checkout</h1>
          
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Shipping Information */}
              <section className="bg-white p-8 rounded-2xl premium-shadow border border-border/50">
                <h2 className="text-xl font-headline font-bold mb-8">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Input id="address" placeholder="House/Flat No, Street, Landmark" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Kochi" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="682XXX" required className="rounded-xl" />
                  </div>
                </div>
              </section>

              {/* Payment Section Indicator */}
              <section className="bg-white p-8 rounded-2xl premium-shadow border border-border/50">
                <h2 className="text-xl font-headline font-bold mb-6">Payment Method</h2>
                <div className="border-2 border-brand-red bg-brand-red/5 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="text-brand-red h-6 w-6" />
                    <div>
                      <p className="font-bold">Cashfree Secure Gateway</p>
                      <p className="text-xs text-muted-foreground">UPI, Cards, Net Banking & Wallets</p>
                    </div>
                  </div>
                  <ShieldCheck className="text-green-600 h-6 w-6" />
                </div>
              </section>
            </div>

            {/* Sidebar Summary */}
            <aside className="space-y-6">
              <div className="bg-white p-8 rounded-2xl premium-shadow border border-border/50 sticky top-32">
                <h2 className="text-xl font-headline font-bold mb-6">Your Items</h2>
                <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[150px]">{item.name} x {item.quantity}</span>
                      <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-brand-red">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-brand-red hover:bg-brand-red/90 py-6 rounded-xl font-bold text-lg"
                >
                  {isProcessing ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                </Button>
                <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Your transaction is encrypted and secure.</span>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
