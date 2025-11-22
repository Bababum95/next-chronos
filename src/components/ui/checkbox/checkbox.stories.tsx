import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../label';

import { Checkbox } from './checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    isError: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    isError: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        Accept terms and conditions
      </Label>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <Label htmlFor="option1" className="cursor-pointer">
          Option 1
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" defaultChecked />
        <Label htmlFor="option2" className="cursor-pointer">
          Option 2 (checked)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" disabled />
        <Label htmlFor="option3" className="cursor-pointer">
          Option 3 (disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option4" isError />
        <Label htmlFor="option4" className="cursor-pointer">
          Option 4 (error)
        </Label>
      </div>
    </div>
  ),
};
