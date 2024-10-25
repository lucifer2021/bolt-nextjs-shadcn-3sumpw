import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Focus Flow</h1>
          <p className="mt-2 text-muted-foreground">
            Your all-in-one productivity companion
          </p>
        </div>
        <div className="space-y-4">
          <Link href="/login">
            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="w-full" variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}