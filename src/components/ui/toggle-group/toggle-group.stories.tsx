import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Left aligned">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center aligned">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right aligned">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Justify">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Left aligned">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center aligned">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right aligned">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Secondary: Story = {
  render: () => (
    <ToggleGroup type="single" variant="secondary" defaultValue="bold">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" size="sm" defaultValue="left">
        <ToggleGroupItem value="left">Small</ToggleGroupItem>
        <ToggleGroupItem value="center">Small</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default" defaultValue="left">
        <ToggleGroupItem value="left">Default</ToggleGroupItem>
        <ToggleGroupItem value="center">Default</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="left">
        <ToggleGroupItem value="left">Large</ToggleGroupItem>
        <ToggleGroupItem value="center">Large</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center" disabled>
        Center (Disabled)
      </ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

