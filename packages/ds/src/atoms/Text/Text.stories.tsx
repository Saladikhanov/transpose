import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text.tsx';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  args: { children: 'Your changes are saved on this device and sync when you are online.' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {};
export const Caption: Story = { args: { size: 'caption', tone: 'muted' } };
export const Accent: Story = { args: { tone: 'accent', weight: 'medium' } };
export const Danger: Story = { args: { tone: 'danger', children: 'Enter a full email address.' } };
export const LongWordBreaks: Story = {
  args: {
    children: 'Reference: TRANSPOSE-ORDER-000000000000000000000000000000000000000000000000000000000001',
  },
};
