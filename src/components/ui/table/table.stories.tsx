import type { Meta, StoryObj } from '@storybook/react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Simple: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithSelected: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected">
          <TableCell className="font-medium">Selected Item</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>2024-01-15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Item 2</TableCell>
          <TableCell>Inactive</TableCell>
          <TableCell>2024-01-14</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Item 3</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>2024-01-13</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithoutCaption: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Product A</TableCell>
          <TableCell>$99.99</TableCell>
          <TableCell>50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Product B</TableCell>
          <TableCell>$149.99</TableCell>
          <TableCell>30</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Product C</TableCell>
          <TableCell>$199.99</TableCell>
          <TableCell>20</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

