'use client';

import Link from 'next/link';

import { AuthCard, SocialAuthButtons, TermsCheckbox, useSignUp } from '@/features/auth';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  const { formData, updateField, handleSubmit, state } = useSignUp();

  return (
    <AuthCard title="Sign up" description="Enter your information to create an account">
      <div className="grid gap-4">
        <FormField
          id="name"
          label="Full name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          error={state.fieldErrors.name}
          required
        />
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
        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          error={state.fieldErrors.confirmPassword}
        />
        <TermsCheckbox
          value={formData.terms}
          onChange={(value) => updateField('terms', value)}
          error={state.fieldErrors.terms}
        />
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
          isLoading={state.isLoading}
          disabled={state.hasError}
        >
          Create account
        </Button>
        <SocialAuthButtons type="signup" />
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
