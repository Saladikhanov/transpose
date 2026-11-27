import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Badge } from '../Badge/Badge.tsx';
import { Button } from '../Button/Button.tsx';
import { Inline } from './Inline.tsx';

const meta = {
  title: 'Atoms/Inline',
  component: Inline,
  args: {
    children: [
      <Button key="a">Cancel</Button>,
      <Button key="b" variant="primary">
        Save changes
      </Button>,
    ],
  },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const row = canvas.getByRole('button', { name: 'Cancel' }).parentElement;
    await expect(row).toHaveStyle({ flexDirection: 'row', flexWrap: 'wrap', columnGap: '8px' });
  },
};

export const SpaceBetween: Story = { args: { justify: 'between' } };

export const ManyItemsWrap: Story = {
  args: {
    gap: '2',
    children: ['Draft', 'Paid', 'Shipped', 'Returned', 'Archived', 'Late', 'On hold', 'New'].map((label) => (
      <Badge key={label}>{label}</Badge>
    )),
  },
};
