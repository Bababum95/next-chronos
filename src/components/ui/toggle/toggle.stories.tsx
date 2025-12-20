import type { Meta, StoryObj } from '@storybook/react';
import { Bold, Italic, Underline } from 'lucide-react';

import { Toggle } from './toggle';

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    pressed: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
};

export const Pressed: Story = {
  args: {
    pressed: true,
    children: 'Toggle',
  },
};

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const IconPressed: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" pressed>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const TextFormatting: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic" pressed>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Toggle variant="default">Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
        <Toggle variant="secondary">Secondary</Toggle>
        <Toggle variant="ghost">Ghost</Toggle>
      </div>
      <div className="flex gap-2">
        <Toggle variant="default" pressed>
          Default
        </Toggle>
        <Toggle variant="outline" pressed>
          Outline
        </Toggle>
        <Toggle variant="secondary" pressed>
          Secondary
        </Toggle>
        <Toggle variant="ghost" pressed>
          Ghost
        </Toggle>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
      <Toggle size="icon">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled pressed>
        Disabled Pressed
      </Toggle>
    </div>
  ),
};

