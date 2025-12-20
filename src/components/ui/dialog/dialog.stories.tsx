import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. It provides context about the dialog content.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Dialog content goes here.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Form Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Enter your information below to create your account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog (No Close Button)</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Dialog Without Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t have a close button in the top right corner.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>You must use the footer buttons to close this dialog.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Simple Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simple Dialog</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>This is a simple dialog with minimal content.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};
