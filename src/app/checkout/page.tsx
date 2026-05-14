
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";
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
    
    // Simulate Cashfree Payment Initiation using provided credentials
    const appId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
    
    toast({
      title: "Secure Payment",
      description: `Connecting to Cashfree Gateway (ID: ${appId?.substring(0, 6)}...)`,
    });

    // Simulate verification delay
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Verified",
        description: "Your transaction via Cashfree was successful.",
      });
      clearCart();
      router.push("/");
    }, 2500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-offwhite">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-muted-foreground">Your cart is empty. Return to shop.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <h1 className="text-3xl font-headline font-bold">Checkout</h1>
            <div className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              <Lock className="h-3 w-3 mr-1" />
              SECURE
            </div>
          </div>
          
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
                <div className="border-2 border-brand-red bg-brand-red/5 p-6 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <CreditCard className="text-brand-red h-8 w-8" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Cashfree Secure Gateway</p>
                      <p className="text-xs text-muted-foreground">Trusted by 10,000+ merchants</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <ShieldCheck className="text-green-600 h-8 w-8 ml-auto" />
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">PCI-DSS Compliant</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4 opacity-50 grayscale">
                  <div className="h-8 bg-muted rounded flex items-center justify-center text-[10px] font-bold">UPI</div>
                  <div className="h-8 bg-muted rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                  <div className="h-8 bg-muted rounded flex items-center justify-center text-[10px] font-bold">MASTERCARD</div>
                  <div className="h-8 bg-muted rounded flex items-center justify-center text-[10px] font-bold">WALLETS</div>
                </div>
              </section>
            </div>

            {/* Sidebar Summary */}
            <aside className="space-y-6">
              <div className="bg-white p-8 rounded-2xl premium-shadow border border-border/50 sticky top-32">
                <h2 className="text-xl font-headline font-bold mb-6">Order Summary</h2>
                <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[150px]">{item.name} x {item.quantity}</span>
                      <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <span className={subtotal > 1000 ? "text-green-600" : ""}>{subtotal > 1000 ? "FREE" : "₹99"}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Grand Total</span>
                    <span className="text-brand-red">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-brand-red hover:bg-brand-red/90 py-6 rounded-xl font-bold text-lg shadow-lg"
                >
                  {isProcessing ? "Connecting..." : `Pay ₹${total.toLocaleString()}`}
                </Button>
                <p className="text-center text-[10px] text-muted-foreground mt-4 italic">
                  By clicking Pay, you agree to our terms and conditions.
                </p>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
