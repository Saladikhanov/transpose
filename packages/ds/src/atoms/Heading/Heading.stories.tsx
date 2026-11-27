import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Heading } from './Heading.tsx';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  args: { level: 1, children: 'Set up your workspace' },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument();
  },
};
export const Display: Story = { args: { size: 'display' } };
export const SectionHeading: Story = { args: { level: 2, children: 'Billing' } };
