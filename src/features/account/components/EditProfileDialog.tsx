import { SquarePen, Upload, X, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';

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
import { useEditProfileForm } from '@/features/account/hooks/useEditProfileForm';
import { useAvatarUpload } from '@/features/account/hooks/useAvatarUpload';
import { UserAvatar } from '@/entities/user/components/UserAvatar';

export function EditProfileDialog() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { name, email, avatarUrl, isLoading, fieldErrors, updateField, submitForm, resetForm } =
    useEditProfileForm();

  const { isUploading, uploadAvatar, deleteAvatar } = useAvatarUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

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

  const handleDeleteAvatar = () => {
    deleteAvatar();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <SquarePen size={14} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="relative flex flex-col items-center gap-2">
              <UserAvatar url={avatarUrl} name={name} size={32} />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {isUploading ? 'Uploading...' : 'Set New Photo'}
                </Button>
                {avatarUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleDeleteAvatar}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <FormField
              id="name"
              label="Full name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => updateField('name', e.target.value)}
              error={fieldErrors.name}
              required
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => updateField('email', e.target.value)}
              error={fieldErrors.email}
              required
            />
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
