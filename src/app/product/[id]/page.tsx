
"use client";

import { use } from "react";
import { allProducts } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useStore();
  const { toast } = useToast();
  const router = useRouter();

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl font-bold">Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} is now in your shopping cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-3xl premium-shadow border border-border/50">
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-brand-red text-white uppercase tracking-widest text-[10px] px-3">
                    {product.brand}
                  </Badge>
                  <div className="flex items-center text-yellow-500 gap-1">
                    <Star className="fill-current h-4 w-4" />
                    <span className="font-bold text-sm text-brand-charcoal">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">(120 Reviews)</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-brand-charcoal leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-headline font-bold text-brand-red">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.discountPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
                {product.features && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <Button 
                  onClick={handleAddToCart}
                  variant="outline" 
                  className="py-7 rounded-xl border-brand-charcoal hover:bg-brand-charcoal hover:text-white font-bold text-lg flex items-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="py-7 rounded-xl bg-brand-red hover:bg-brand-red/90 font-bold text-lg flex items-center gap-2 shadow-xl shadow-brand-red/20"
                >
                  <Zap className="h-5 w-5" /> Buy It Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                <div className="text-center space-y-1">
                  <Truck className="h-6 w-6 mx-auto text-brand-red" />
                  <p className="text-[10px] font-bold uppercase">Fast Delivery</p>
                </div>
                <div className="text-center space-y-1">
                  <RotateCcw className="h-6 w-6 mx-auto text-brand-red" />
                  <p className="text-[10px] font-bold uppercase">30-Day Return</p>
                </div>
                <div className="text-center space-y-1">
                  <ShieldCheck className="h-6 w-6 mx-auto text-brand-red" />
                  <p className="text-[10px] font-bold uppercase">Secure Pay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
