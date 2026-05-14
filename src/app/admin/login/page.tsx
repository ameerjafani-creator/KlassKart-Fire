
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Jafani" && password === "admin123") {
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin Jafani.",
      });
      // In a real app, set a secure cookie or token here
      router.push("/admin/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please check your username and password.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-charcoal p-4">
      <Card className="w-full max-w-md bg-white premium-shadow border-none rounded-2xl">
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-headline text-3xl font-bold">K</span>
          </div>
          <CardTitle className="text-2xl font-headline">Admin Access</CardTitle>
          <CardDescription>Secure command center for Klass Kart operations.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6 px-10">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                className="rounded-xl border-muted py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="rounded-xl border-muted py-6"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-10 pb-10 pt-6">
            <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red/90 rounded-xl py-6 font-bold">
              Secure Login
            </Button>
            <Link href="/" className="text-sm text-muted-foreground hover:text-brand-red transition-colors text-center">
              Return to Website
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
