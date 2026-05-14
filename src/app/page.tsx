
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

const mockProducts = [
  {
    id: "1",
    name: "Ultra-Fast Charging Smartphone X12",
    price: 45999,
    discountPrice: 52999,
    image: "https://picsum.photos/seed/phone1/600/600",
    category: "Mobiles",
    brand: "X-Tech",
    stock: 20,
    rating: 4.8,
    description: "Premium performance smartphone with triple lens camera."
  },
  {
    id: "2",
    name: "Luxury Minimalist Analog Watch",
    price: 8999,
    discountPrice: 12000,
    image: "https://picsum.photos/seed/watch1/600/600",
    category: "Watches",
    brand: "Klassic",
    stock: 15,
    rating: 4.9,
    description: "Elegant minimalist watch for the modern professional."
  },
  {
    id: "3",
    name: "Noise Cancelling Headphones V2",
    price: 15999,
    discountPrice: 19999,
    image: "https://picsum.photos/seed/audio1/600/600",
    category: "Electronics",
    brand: "Sonic",
    stock: 30,
    rating: 4.7,
    description: "Crystal clear sound with advanced active noise cancellation."
  },
  {
    id: "4",
    name: "Premium Linen Blend Summer Shirt",
    price: 2499,
    discountPrice: 3500,
    image: "https://picsum.photos/seed/shirt1/600/600",
    category: "Fashion",
    brand: "Trend",
    stock: 50,
    rating: 4.5,
    description: "Lightweight and breathable linen shirt for summer days."
  }
];

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

        {/* AI Recommendations */}
        {hasRecommendations && (
          <section className="py-16 bg-brand-red/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center space-x-2 mb-8">
                <Sparkles className="text-brand-red h-6 w-6" />
                <h2 className="text-2xl font-bold">Personalized for You</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {aiRecs!.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-brand-red/10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles className="h-20 w-20 text-brand-red" />
                    </div>
                    <Badge variant="outline" className="mb-4 border-brand-red text-brand-red">AI Recommended</Badge>
                    <h3 className="font-headline font-semibold text-lg mb-2">{rec.productName}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {rec.reason}
                    </p>
                    <Button asChild variant="link" className="p-0 text-brand-red group-hover:translate-x-1 transition-transform">
                      <Link href="/shop" className="flex items-center">Explore this <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section className="py-20">
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
              {mockProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Values / Trust Badges */}
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

      {/* WhatsApp Support Button */}
      <a 
        href="https://wa.me/919387762313" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
