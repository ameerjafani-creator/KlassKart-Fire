
"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky-nav px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <span className="text-white font-headline text-2xl font-bold">K</span>
          </div>
          <span className="font-headline text-xl font-bold hidden sm:block tracking-tighter">
            KLASS<span className="text-brand-red">KART</span>
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Input 
            placeholder="Search for products, brands and more..." 
            className="w-full bg-muted border-none rounded-full px-10 focus-visible:ring-brand-red"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative hover:text-brand-red">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:text-brand-red">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-red">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="icon" className="hover:text-brand-red">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 space-y-2 border-t mt-4 animate-in slide-in-from-top duration-300">
          <Link href="/shop" className="block px-4 py-2 font-medium hover:text-brand-red">Shop All</Link>
          <Link href="/categories" className="block px-4 py-2 font-medium hover:text-brand-red">Categories</Link>
          <Link href="/deals" className="block px-4 py-2 font-medium hover:text-brand-red">Today's Deals</Link>
          <div className="px-4 py-2">
            <div className="relative">
              <Input placeholder="Search..." className="w-full rounded-full" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
