import type { Meta, StoryObj } from '@storybook/react';
import { FolderOpen, Inbox, Search, FileX } from 'lucide-react';

import { Button } from '../button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';

const meta = {
  title: 'UI/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="rounded-md border w-[400px]">
      <EmptyContent>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>
          There are no items to display. Get started by creating your first item.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
};

export const WithIconVariant: Story = {
  render: () => (
    <Empty className="rounded-md border w-[400px]">
      <EmptyContent>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
};

export const WithDefaultMedia: Story = {
  render: () => (
    <Empty className="rounded-md border w-[400px]">
      <EmptyContent>
        <EmptyMedia variant="default">
          <Search className="size-12 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search criteria or filters to find what you&apos;re looking for.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Empty className="rounded-md border w-[400px]">
      <EmptyContent>
        <EmptyMedia variant="icon">
          <FileX />
        </EmptyMedia>
        <EmptyTitle>No files uploaded</EmptyTitle>
        <EmptyDescription>
          Upload your first file to get started. Supported formats: PDF, DOC, DOCX.
        </EmptyDescription>
        <Button className="mt-4">Upload File</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Empty className="rounded-md border w-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Empty State</EmptyTitle>
        <EmptyDescription>
          This is an example of using EmptyHeader component for better structure.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Empty className="rounded-md border w-[400px]">
      <EmptyContent>
        <EmptyTitle>Nothing here</EmptyTitle>
      </EmptyContent>
    </Empty>
  ),
};

export const WithLink: Story = {
  render: () => (
    <Empty className="rounded-md border w-[400px]">
      <EmptyContent>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No data available</EmptyTitle>
        <EmptyDescription>
          Check out our{' '}
          <a href="#" className="text-primary hover:underline">
            documentation
          </a>{' '}
          to learn how to get started.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
};
