
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to dashboard, which handles its own auth check
    router.push("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center">
          <span className="text-white font-headline text-2xl font-bold">K</span>
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Loading Admin Portal...
        </p>
      </div>
    </div>
  );
}
