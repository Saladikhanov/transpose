import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { Button } from './Button.tsx';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Save changes', onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const FullWidth: Story = { args: { variant: 'primary', width: 'full' } };

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Keyboard: Story = {
  args: { variant: 'primary' },
  play: async ({ canvas, args }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const TouchTarget: Story = {
  args: { variant: 'secondary', children: 'OK' },
  play: async ({ canvas }) => {
    const { width, height } = canvas.getByRole('button').getBoundingClientRect();
    await expect(height).toBeGreaterThanOrEqual(44);
    await expect(width).toBeGreaterThanOrEqual(44);
  },
};
