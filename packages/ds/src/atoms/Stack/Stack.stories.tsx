import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '../Button/Button.tsx';
import { Text } from '../Text/Text.tsx';
import { Stack } from './Stack.tsx';

const meta = {
  title: 'Atoms/Stack',
  component: Stack,
  args: {
    gap: '4',
    children: [
      <Text key="a">First item</Text>,
      <Text key="b">Second item</Text>,
      <Button key="c" variant="primary">
        Continue
      </Button>,
    ],
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const stack = canvas.getByText('First item').parentElement;
    await expect(stack).toHaveStyle({ flexDirection: 'column', rowGap: '16px' });
  },
};

export const Tight: Story = { args: { gap: '1' } };

export const CenterAligned: Story = { args: { align: 'center' } };
