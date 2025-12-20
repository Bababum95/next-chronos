import type { Meta, StoryObj } from '@storybook/react';

import { TruncatedText } from './truncated-text';

const meta = {
  title: 'UI/TruncatedText',
  component: TruncatedText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'number',
    },
  },
} satisfies Meta<typeof TruncatedText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a long text that will be truncated',
    maxWidth: 200,
  },
};

export const ShortText: Story = {
  args: {
    children: 'Short text',
    maxWidth: 200,
  },
};

export const LongText: Story = {
  args: {
    children:
      'This is a very long text that will definitely be truncated when it exceeds the maximum width',
    maxWidth: 150,
  },
};

export const CustomWidth: Story = {
  args: {
    children: 'This text has a custom maximum width of 300 pixels',
    maxWidth: 300,
  },
};

export const WithPercentage: Story = {
  args: {
    children: 'This text uses percentage width',
    maxWidth: '50%',
  },
  render: (args) => (
    <div className="w-[500px] border p-4">
      <TruncatedText {...args} />
    </div>
  ),
};

export const InTable: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div className="w-[400px]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Item 1</td>
            <td className="p-2">
              <TruncatedText maxWidth={150}>
                This is a very long description that will be truncated in the table cell
              </TruncatedText>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-2">Item 2</td>
            <td className="p-2">
              <TruncatedText maxWidth={150}>
                Another long description that needs truncation
              </TruncatedText>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const MultipleInstances: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div className="space-y-2 w-[300px]">
      <TruncatedText maxWidth={250}>
        First item with a very long name that will be truncated
      </TruncatedText>
      <TruncatedText maxWidth={250}>
        Second item with another long name that will also be truncated
      </TruncatedText>
      <TruncatedText maxWidth={250}>Third item</TruncatedText>
    </div>
  ),
};
