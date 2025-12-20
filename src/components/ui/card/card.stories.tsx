import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button in the header</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            ⋮
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content with action button in the top right corner.</p>
      </CardContent>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const WithMultipleActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Multiple Actions</CardTitle>
        <CardDescription>Card with multiple action buttons</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates multiple action buttons in the footer.</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};
