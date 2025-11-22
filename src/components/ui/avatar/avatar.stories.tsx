import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarImage, AvatarFallback } from './avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithBrokenImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-link.com/image.png" alt="Broken" />
      <AvatarFallback>BR</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="Medium" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-24">
        <AvatarImage src="https://github.com/shadcn.png" alt="XLarge" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
    </div>
  ),
};
