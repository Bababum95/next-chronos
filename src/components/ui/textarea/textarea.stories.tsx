import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../label';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[350px]">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a pre-filled textarea with some content.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
    defaultValue: 'Cannot edit this text',
  },
};

export const CustomRows: Story = {
  args: {
    placeholder: 'Enter text...',
    rows: 5,
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'This textarea can be resized...',
    className: 'resize',
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Textarea id="subject" placeholder="Enter subject..." rows={1} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" placeholder="Enter your message..." rows={6} />
      </div>
    </div>
  ),
};

