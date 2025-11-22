import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator {...args} className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator {...args} orientation="vertical" />
        <div>Docs</div>
        <Separator {...args} orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-[200px] items-center space-x-4">
      <div>Item 1</div>
      <Separator {...args} />
      <div>Item 2</div>
      <Separator {...args} />
      <div>Item 3</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <h4 className="text-sm font-medium">Card Title</h4>
      <p className="text-sm text-muted-foreground">Card description goes here.</p>
      <Separator className="my-4" />
      <div className="text-sm">Card content</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <div className="p-2">List item 1</div>
      <Separator />
      <div className="p-2">List item 2</div>
      <Separator />
      <div className="p-2">List item 3</div>
    </div>
  ),
};

