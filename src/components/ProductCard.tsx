
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
    <div className="animated-border group hover-lift premium-shadow">
      <div className="animated-border-content">
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
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${isWishlisted ? 'text-brand-red' : 'text-muted-foreground hover:text-brand-red'}`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </Link>
        
        <div className="p-4 space-y-2">
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

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-brand-charcoal dark:text-white">
                ₹{product.price.toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.discountPrice.toLocaleString()}
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
