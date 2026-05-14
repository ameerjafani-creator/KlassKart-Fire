
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getAIProductRecommendations } from "@/ai/flows/ai-product-recommendations";
import { allProducts } from "@/lib/products";

const categories = [
  { name: "Electronics", icon: "💻", id: "electronics" },
  { name: "Fashion", icon: "👗", id: "fashion" },
  { name: "Mobiles", icon: "📱", id: "mobiles" },
  { name: "Accessories", icon: "⌚", id: "accessories" },
  { name: "Kitchen", icon: "🍳", id: "home-kitchen" },
  { name: "Beauty", icon: "💄", id: "beauty" }
];

export default async function Home() {
  // Use AI Recommendation Flow
  let aiRecs = null;
  try {
    aiRecs = await getAIProductRecommendations({
      userId: "guest",
      browsingHistory: ["Electronics", "Watches"],
      trendingItems: ["V2 Headphones", "Luxury Watch"],
      pastPurchases: []
    });
  } catch (e: any) {
    console.error("AI recommendation failed to execute:", e?.message || "Unknown error");
  }

  const hasRecommendations = aiRecs && aiRecs.recommendations && aiRecs.recommendations.length > 0;
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
          <Image
            src={PlaceHolderImages.find(i => i.id === 'hero-electronics')?.imageUrl || "https://picsum.photos/seed/hero/1200/600"}
            alt="Hero Banner"
            fill
            className="object-cover"
            priority
            data-ai-hint="golden retriever"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full animate-fade-in">
              <div className="max-w-xl space-y-6">
                <Badge className="bg-brand-red text-white py-1 px-4 text-sm font-semibold uppercase tracking-widest border-none">
                  Special Offer 2024
                </Badge>
                <h1 className="text-4xl md:text-7xl text-white font-headline leading-tight">
                  Unconditional Love, <br />
                  <span className="text-brand-red">Modern Lifestyle.</span>
                </h1>
                <p className="text-gray-300 text-lg max-w-md">
                  Discover products that bring joy to you and your companions. Quality meets excellence at Klass Kart.
                </p>
                <div className="flex space-x-4">
                  <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red/90 rounded-full px-8">
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brand-charcoal rounded-full px-8">
                    <Link href="/categories">View Categories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="py-12 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Shop by Category</h2>
              <Link href="/categories" className="text-brand-red font-medium flex items-center hover:underline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/shop?category=${cat.id}`} className="group text-center space-y-4">
                  <div className="w-full aspect-square bg-brand-offwhite rounded-2xl flex items-center justify-center text-4xl group-hover:bg-brand-red group-hover:text-white transition-all duration-300 premium-shadow">
                    {cat.icon}
                  </div>
                  <span className="font-medium text-brand-charcoal group-hover:text-brand-red transition-colors">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Trending Products</h2>
                <p className="text-muted-foreground">The most sought-after items this week.</p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/shop">View Full Catalog</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Values */}
        <section className="py-16 bg-brand-charcoal text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto text-2xl">🚚</div>
              <h3 className="text-xl font-bold">Fast Pan-India Delivery</h3>
              <p className="text-gray-400 text-sm">Lightning fast shipping to over 20,000 pincodes across India.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto text-2xl">🛡️</div>
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-gray-400 text-sm">Powered by Cashfree. PCI-DSS compliant secure transactions.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto text-2xl">🔄</div>
              <h3 className="text-xl font-bold">Easy 30-Day Returns</h3>
              <p className="text-gray-400 text-sm">Not happy? Send it back. No questions asked return policy.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
