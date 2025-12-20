import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipLite, TooltipTrigger } from './tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Lite: Story = {
  render: () => (
    <TooltipLite content="This is a simple tooltip">
      <Button>Hover me</Button>
    </TooltipLite>
  ),
};

export const WithText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover for more info</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Additional information about this button</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover for details</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>
          This is a longer tooltip message that contains more detailed information about the
          element.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="rounded-full p-2 hover:bg-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Information icon</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Button 1</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for button 1</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Button 2</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for button 2</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Button 3</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for button 3</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
