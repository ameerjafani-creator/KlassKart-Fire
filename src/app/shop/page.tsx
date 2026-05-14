
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const allProducts = [
  { id: "1", name: "Ultra-Fast Charging Smartphone X12", price: 45999, discountPrice: 52999, image: "https://picsum.photos/seed/phone1/600/600", category: "mobiles", brand: "X-Tech", stock: 20, rating: 4.8, description: "Premium performance smartphone." },
  { id: "2", name: "Luxury Minimalist Analog Watch", price: 8999, discountPrice: 12000, image: "https://picsum.photos/seed/watch1/600/600", category: "accessories", brand: "Klassic", stock: 15, rating: 4.9, description: "Elegant minimalist watch." },
  { id: "3", name: "Noise Cancelling Headphones V2", price: 15999, discountPrice: 19999, image: "https://picsum.photos/seed/audio1/600/600", category: "electronics", brand: "Sonic", stock: 30, rating: 4.7, description: "Crystal clear sound." },
  { id: "4", name: "Premium Linen Blend Summer Shirt", price: 2499, discountPrice: 3500, image: "https://picsum.photos/seed/shirt1/600/600", category: "fashion", brand: "Trend", stock: 50, rating: 4.5, description: "Lightweight and breathable." },
  { id: "5", name: "Mechanical Gaming Keyboard RGB", price: 6500, discountPrice: 8000, image: "https://picsum.photos/seed/kb1/600/600", category: "electronics", brand: "GamerPro", stock: 12, rating: 4.6, description: "Responsive tactile switches." },
  { id: "6", name: "Organic Face Cleanser 200ml", price: 799, discountPrice: 999, image: "https://picsum.photos/seed/beauty1/600/600", category: "beauty", brand: "EcoBeauty", stock: 100, rating: 4.4, description: "Gentle natural ingredients." },
];

const categories = [
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Mobiles", value: "mobiles" },
  { label: "Accessories", value: "accessories" },
  { label: "Beauty", value: "beauty" },
];

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = allProducts.filter(p => 
    selectedCategories.length === 0 || selectedCategories.includes(p.category)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={cat.value} 
                      checked={selectedCategories.includes(cat.value)}
                      onCheckedChange={() => toggleCategory(cat.value)}
                    />
                    <Label htmlFor={cat.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {cat.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 border rounded-lg text-xs">Min: ₹0</div>
                  <div className="p-2 border rounded-lg text-xs">Max: ₹1L+</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-headline font-bold">Catalog</h1>
                <p className="text-muted-foreground text-sm">Showing {sortedProducts.length} results</p>
              </div>
              <div className="flex items-center space-x-2 min-w-[200px]">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
