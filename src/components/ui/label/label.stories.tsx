import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../input';

import { Label } from './label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2 w-[350px]">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2 w-[350px]">
      <Label htmlFor="name">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input id="name" placeholder="John Doe" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2 w-[350px]">
      <Label htmlFor="disabled-input">Disabled Input</Label>
      <Input id="disabled-input" disabled placeholder="Cannot edit" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
    </div>
  ),
};
