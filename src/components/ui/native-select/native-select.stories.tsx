import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../label';
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from './native-select';

const meta = {
  title: 'UI/NativeSelect',
  component: NativeSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeSelect>
      <NativeSelectOption value="">Select an option</NativeSelectOption>
      <NativeSelectOption value="option1">Option 1</NativeSelectOption>
      <NativeSelectOption value="option2">Option 2</NativeSelectOption>
      <NativeSelectOption value="option3">Option 3</NativeSelectOption>
    </NativeSelect>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[250px]">
      <Label htmlFor="select">Choose an option</Label>
      <NativeSelect id="select">
        <NativeSelectOption value="">Select...</NativeSelectOption>
        <NativeSelectOption value="option1">Option 1</NativeSelectOption>
        <NativeSelectOption value="option2">Option 2</NativeSelectOption>
        <NativeSelectOption value="option3">Option 3</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <NativeSelect defaultValue="option2">
      <NativeSelectOption value="option1">Option 1</NativeSelectOption>
      <NativeSelectOption value="option2">Option 2</NativeSelectOption>
      <NativeSelectOption value="option3">Option 3</NativeSelectOption>
    </NativeSelect>
  ),
};

export const WithClear: Story = {
  render: () => {
    const [value, setValue] = React.useState('option2');
    return (
      <NativeSelect value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')}>
        <NativeSelectOption value="">Select...</NativeSelectOption>
        <NativeSelectOption value="option1">Option 1</NativeSelectOption>
        <NativeSelectOption value="option2">Option 2</NativeSelectOption>
        <NativeSelectOption value="option3">Option 3</NativeSelectOption>
      </NativeSelect>
    );
  },
};

export const WithOptGroup: Story = {
  render: () => (
    <NativeSelect>
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOptGroup label="Citrus">
        <NativeSelectOption value="orange">Orange</NativeSelectOption>
        <NativeSelectOption value="lemon">Lemon</NativeSelectOption>
        <NativeSelectOption value="lime">Lime</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Berries">
        <NativeSelectOption value="strawberry">Strawberry</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        <NativeSelectOption value="raspberry">Raspberry</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

export const Loading: Story = {
  render: () => (
    <NativeSelect isLoading>
      <NativeSelectOption value="">Loading...</NativeSelectOption>
    </NativeSelect>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled>
      <NativeSelectOption value="">Disabled select</NativeSelectOption>
      <NativeSelectOption value="option1">Option 1</NativeSelectOption>
      <NativeSelectOption value="option2">Option 2</NativeSelectOption>
    </NativeSelect>
  ),
};

export const MultipleOptions: Story = {
  render: () => (
    <NativeSelect>
      <NativeSelectOption value="">Choose a country</NativeSelectOption>
      <NativeSelectOption value="us">United States</NativeSelectOption>
      <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
      <NativeSelectOption value="ca">Canada</NativeSelectOption>
      <NativeSelectOption value="au">Australia</NativeSelectOption>
      <NativeSelectOption value="de">Germany</NativeSelectOption>
      <NativeSelectOption value="fr">France</NativeSelectOption>
      <NativeSelectOption value="jp">Japan</NativeSelectOption>
    </NativeSelect>
  ),
};

