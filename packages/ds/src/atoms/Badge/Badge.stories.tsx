import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge.tsx';

const meta = { title: 'Atoms/Badge', component: Badge, args: { children: 'Draft' } } satisfies Meta<
  typeof Badge
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Accent: Story = { args: { tone: 'accent', children: 'Recommended' } };
export const Danger: Story = { args: { tone: 'danger', children: 'Overdue' } };
