
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock admin authentication
    setTimeout(() => {
      if (username === "Jafani" && password === "Kottakkal@3") {
        toast({
          title: "Access Granted",
          description: "Welcome to the Klass Kart Command Center.",
        });
        localStorage.setItem("admin_auth", "true");
        router.push("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid administrator credentials.",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-charcoal p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
          <span className="font-headline font-bold text-xl">K</span>
          <span className="text-sm">Back to Site</span>
        </Link>
      </div>

      <Card className="w-full max-w-md bg-white premium-shadow border-none rounded-3xl overflow-hidden">
        <div className="bg-brand-red p-1 text-center text-[10px] text-white font-bold tracking-[0.2em] uppercase">
          Administrator Secure Access
        </div>
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="w-20 h-20 bg-brand-red/5 rounded-3xl flex items-center justify-center mx-auto mb-2 border border-brand-red/10 shadow-inner">
            <Lock className="text-brand-red h-10 w-10" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-headline font-bold text-brand-charcoal">Admin Portal</CardTitle>
            <CardDescription className="text-muted-foreground">Authorized personnel only</CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6 px-10">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Admin Username</Label>
              <Input 
                id="username" 
                placeholder="Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                className="rounded-xl border-muted bg-brand-offwhite/50 py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Security Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="rounded-xl border-muted bg-brand-offwhite/50 py-6"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 px-10 pb-12 pt-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-charcoal hover:bg-black text-white rounded-xl py-7 font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {isLoading ? "Authenticating..." : "Establish Secure Session"}
            </Button>
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
              <ShieldCheck className="h-3 w-3 text-green-600" />
              End-to-End Encrypted Session
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
