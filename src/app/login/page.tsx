'use client';

import Link from 'next/link';

import { useLogin } from './useLogin';

import { AuthCard } from '@/components/auth/AuthCard';
import { FormField } from '@/components/auth/FormField';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const { formData, updateField, handleSubmit, state } = useLogin();

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <AuthCard title="Login" description="Enter your email below to login to your account">
        <div className="grid gap-4">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={state.fieldErrors.email}
            required
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            error={state.fieldErrors.password}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit}
            isLoading={state.isLoading}
            disabled={state.hasError}
          >
            Sign in
          </Button>

          <SocialAuthButtons />

          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
