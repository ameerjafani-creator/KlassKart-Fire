
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-offwhite p-4 text-center">
      <div className="w-20 h-20 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-brand-red font-headline text-4xl font-bold">404</span>
      </div>
      <h1 className="text-3xl font-headline font-bold text-brand-charcoal mb-4">not load page</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for might have been moved or is currently unavailable.
      </p>
      <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-10 py-6 font-bold shadow-lg">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
