
export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  description: string;
  features?: string[];
}

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Ultra-Fast Charging Smartphone X12",
    price: 45999,
    discountPrice: 52999,
    image: "https://picsum.photos/seed/phone1/600/600",
    category: "mobiles",
    brand: "X-Tech",
    stock: 20,
    rating: 4.8,
    description: "Experience the future with the X12. Featuring a revolutionary ultra-fast charging system and a stunning AMOLED display, this smartphone is built for those who demand peak performance. The triple-lens camera system captures professional-grade photos in any lighting condition.",
    features: ["5000mAh Battery", "120W Fast Charging", "108MP Main Camera", "6.7-inch Super AMOLED"]
  },
  {
    id: "2",
    name: "Luxury Minimalist Analog Watch",
    price: 8999,
    discountPrice: 12000,
    image: "https://picsum.photos/seed/watch1/600/600",
    category: "accessories",
    brand: "Klassic",
    stock: 15,
    rating: 4.9,
    description: "A statement of elegance. This minimalist analog watch combines timeless design with modern precision. Crafted with a premium leather strap and a scratch-resistant sapphire crystal face, it's the perfect companion for both formal and casual settings.",
    features: ["Genuine Leather Strap", "Sapphire Crystal Glass", "5 ATM Water Resistance", "Japanese Quartz Movement"]
  },
  {
    id: "3",
    name: "Noise Cancelling Headphones V2",
    price: 15999,
    discountPrice: 19999,
    image: "https://picsum.photos/seed/audio1/600/600",
    category: "electronics",
    brand: "Sonic",
    stock: 30,
    rating: 4.7,
    description: "Immerse yourself in pure sound. Our V2 headphones feature state-of-the-art active noise cancellation that adapts to your environment. With high-fidelity audio drivers and 40 hours of battery life, your music has never sounded better or lasted longer.",
    features: ["Adaptive Noise Cancellation", "Hi-Res Audio Support", "40-Hour Battery Life", "Memory Foam Cushions"]
  },
  {
    id: "4",
    name: "Premium Linen Blend Summer Shirt",
    price: 2499,
    discountPrice: 3500,
    image: "https://picsum.photos/seed/shirt1/600/600",
    category: "fashion",
    brand: "Trend",
    stock: 50,
    rating: 4.5,
    description: "Stay cool and stylish this summer. This premium linen blend shirt offers maximum breathability and a relaxed fit. The natural fibers ensure comfort even on the hottest days, making it a staple for your seasonal wardrobe.",
    features: ["Breathable Linen Blend", "Eco-Friendly Fabric", "Relaxed Fit", "Sustainable Production"]
  },
  {
    id: "5",
    name: "Mechanical Gaming Keyboard RGB",
    price: 6500,
    discountPrice: 8000,
    image: "https://picsum.photos/seed/kb1/600/600",
    category: "electronics",
    brand: "GamerPro",
    stock: 12,
    rating: 4.6,
    description: "Dominate the competition with lightning-fast response times. This mechanical keyboard features custom switches designed for tactile feedback and durability. The fully customizable RGB lighting lets you create the perfect gaming atmosphere.",
    features: ["Blue Tactile Switches", "Full RGB Per-Key Lighting", "Anti-Ghosting Technology", "Aircraft-Grade Aluminum Frame"]
  },
  {
    id: "6",
    name: "Organic Face Cleanser 200ml",
    price: 799,
    discountPrice: 999,
    image: "https://picsum.photos/seed/beauty1/600/600",
    category: "beauty",
    brand: "EcoBeauty",
    stock: 100,
    rating: 4.4,
    description: "Reveal your natural glow. Our organic face cleanser is infused with botanical extracts that gently remove impurities without stripping away moisture. Suitable for all skin types, it leaves your face feeling refreshed, hydrated, and soft.",
    features: ["100% Organic Ingredients", "Paraben-Free", "Cruelty-Free", "Rich in Vitamin E"]
  }
];
