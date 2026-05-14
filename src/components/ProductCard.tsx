"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const { toast } = useToast();
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const savings = product.discountPrice ? product.discountPrice - product.price : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your shopping cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} ${isWishlisted ? 'removed' : 'added'} to your favorites.`,
    });
  };

  return (
    <div className="animated-border group hover-lift premium-shadow h-full">
      <div className="animated-border-content flex flex-col h-full bg-card">
        <Link 
          href={`/product/${product.id}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="block relative aspect-square"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
            data-ai-hint="product image"
          />
          <button 
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors z-20 ${isWishlisted ? 'text-brand-red' : 'text-muted-foreground hover:text-brand-red'}`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          {savings > 0 && (
            <div className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
              Save ₹{savings.toLocaleString()}
            </div>
          )}
        </Link>
        
        <div className="p-4 flex flex-col flex-grow space-y-2">
          <Link 
            href={`/product/${product.id}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-brand-red transition-colors min-h-[40px]">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-yellow-400">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-xs font-medium ml-1 text-muted-foreground">{product.rating}</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.brand}</span>
          </div>

          <div className="flex items-end justify-between pt-2 mt-auto">
            <div className="flex flex-col space-y-0.5">
              {product.discountPrice && (
                <span className="text-[10px] text-muted-foreground font-medium">
                  MRP: <span className="line-through">₹{product.discountPrice.toLocaleString()}</span>
                </span>
              )}
              <span className="font-headline font-bold text-base text-brand-charcoal dark:text-white leading-tight">
                Buy at ₹{product.price.toLocaleString()}
              </span>
              {savings > 0 && (
                <span className="text-[10px] font-bold text-green-600">
                  You Save ₹{savings.toLocaleString()}
                </span>
              )}
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full bg-brand-red/10 text-brand-red hover:bg-brand-red hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
