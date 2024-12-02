'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

import { AuthForm } from '../../components/auth-form';
import { SubmitButton } from '../../components/submit-button';

export default function RegisterPage() {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleFormDataSubmit = (formData: FormData) => {
    const email = formData.get('email') as string;
    setIsSuccessful(true);
    toast.success('Login successful');
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign up</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Use your email and password to sign up
          </p>
        </div>
        <AuthForm action={handleFormDataSubmit}>
          <SubmitButton isSuccessful={isSuccessful}>            
            <Link
                href="/chat"
                className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              >
                Sign up
            </Link>
          </SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Already have an account? '}
            <Link
              href="/"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
            {' now.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}