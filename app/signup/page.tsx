import { Brain } from 'lucide-react';
import SignUpForm from '@/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Create Account</h1>
          <p className="mt-2 text-muted-foreground">
            Get started with your productivity journey
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}