import { KeyRound } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { FormField } from '@/components/forms/FormField';
import { useChangePasswordForm } from '@/features/account/hooks/useChangePasswordForm';

export function ChangePasswordDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    currentPassword,
    newPassword,
    confirmPassword,
    isLoading,
    fieldErrors,
    updateField,
    submitForm,
    resetForm,
  } = useChangePasswordForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <KeyRound size={14} />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and set a new password below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <FormField
              id="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => updateField('currentPassword', e.target.value)}
              error={fieldErrors.currentPassword}
              required
            />
            <FormField
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => updateField('newPassword', e.target.value)}
              error={fieldErrors.newPassword}
              required
            />
            <FormField
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              error={fieldErrors.confirmPassword}
              required
            />
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
