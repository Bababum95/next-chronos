import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <AlignLeft className="mr-2 h-4 w-4" />
        Left
      </Button>
      <Button variant="outline">
        <AlignCenter className="mr-2 h-4 w-4" />
        Center
      </Button>
      <Button variant="outline">
        <AlignRight className="mr-2 h-4 w-4" />
        Right
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Justify</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Button 1</Button>
      <ButtonGroupText>or</ButtonGroupText>
      <Button variant="outline">Button 2</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="default">Primary</Button>
      <Button variant="outline">Secondary</Button>
      <Button variant="ghost">Tertiary</Button>
    </ButtonGroup>
  ),
};

export const WithActive: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="default">Active</Button>
      <Button variant="outline">Inactive</Button>
      <Button variant="outline">Inactive</Button>
    </ButtonGroup>
  ),
};

