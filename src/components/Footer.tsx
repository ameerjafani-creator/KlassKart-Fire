
"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
              <span className="text-white font-headline text-xl font-bold">K</span>
            </div>
            <span className="font-headline text-xl font-bold tracking-tighter">KLASSKART</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium destination for curated lifestyle products. Quality meets modern elegance at Klass Kart.
          </p>
          <div className="flex space-x-4">
            <Facebook className="h-5 w-5 text-gray-400 hover:text-brand-red cursor-pointer transition-colors" />
            <Instagram className="h-5 w-5 text-gray-400 hover:text-brand-red cursor-pointer transition-colors" />
            <Twitter className="h-5 w-5 text-gray-400 hover:text-brand-red cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-headline font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/shop" className="hover:text-brand-red transition-colors">Shop All</Link></li>
            <li><Link href="/categories" className="hover:text-brand-red transition-colors">Categories</Link></li>
            <li><Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-headline font-semibold mb-6">Customer Service</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/orders" className="hover:text-brand-red transition-colors">My Orders</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-brand-red transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-brand-red transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/track-order" className="hover:text-brand-red transition-colors">Order Tracking</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-headline font-semibold mb-6">Store Details</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-brand-red" />
              <span>+91 93877 62313</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-brand-red" />
              <span>ameerjafani@gmail.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-brand-red" />
              <span>123 Klass Street, Kochi, Kerala</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-center text-xs text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Klass Kart. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <Link href="/admin/login" className="flex items-center space-x-1 hover:text-white transition-colors">
            <ShieldCheck className="h-3 w-3" />
            <span>Staff Portal</span>
          </Link>
          <div className="flex items-center space-x-2">
            <img src="https://picsum.photos/seed/cf/50/20" alt="Cashfree" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
