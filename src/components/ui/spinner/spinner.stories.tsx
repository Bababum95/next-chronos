import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './spinner';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    className: 'size-4',
  },
};

export const Medium: Story = {
  args: {
    className: 'size-6',
  },
};

export const Large: Story = {
  args: {
    className: 'size-8',
  },
};

export const ExtraLarge: Story = {
  args: {
    className: 'size-12',
  },
};

export const InButton: Story = {
  render: () => (
    <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground">
      <Spinner className="size-4" />
      Loading...
    </button>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner className="size-4" />
      <span>Loading content...</span>
    </div>
  ),
};

