
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
import { allProducts } from "@/lib/products";

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
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-2xl premium-shadow border border-border/50">
              <h3 className="text-lg font-bold mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.value} className="flex items-center space-x-3">
                    <Checkbox 
                      id={cat.value} 
                      checked={selectedCategories.includes(cat.value)}
                      onCheckedChange={() => toggleCategory(cat.value)}
                      className="rounded-md"
                    />
                    <Label htmlFor={cat.value} className="text-sm font-medium cursor-pointer">
                      {cat.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl premium-shadow border border-border/50">
              <h3 className="text-lg font-bold mb-6">Price Range</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border rounded-xl text-xs bg-muted/30">Min: ₹0</div>
                  <div className="p-3 border rounded-xl text-xs bg-muted/30">Max: ₹1L+</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-headline font-bold">Product Catalog</h1>
                <p className="text-muted-foreground text-sm">Showing {sortedProducts.length} high-quality results</p>
              </div>
              <div className="flex items-center space-x-4 bg-white p-2 rounded-full premium-shadow border border-border/50">
                <span className="text-xs font-bold text-muted-foreground uppercase pl-4">Sort:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-full border-none w-[180px] focus:ring-0">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl premium-shadow border border-dashed">
                <p className="text-muted-foreground">No products found for the selected filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
