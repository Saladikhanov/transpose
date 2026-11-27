import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { Checkbox } from './Checkbox.tsx';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: { label: 'Send me weekly reports', onCheckedChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByText('Send me weekly reports'));
    await expect(canvas.getByRole('checkbox', { name: 'Send me weekly reports' })).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};

export const Checked: Story = { args: { defaultChecked: true } };

export const Keyboard: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    const box = canvas.getByRole('checkbox', { name: 'Send me weekly reports' });
    await expect(box).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(box).toBeChecked();
  },
};

export const HitTarget: Story = {
  play: async ({ canvas }) => {
    const label = canvas.getByText('Send me weekly reports').closest('label');
    await expect(label?.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
  },
};

export const Invalid: Story = { args: { invalid: true, required: true } };

export const Disabled: Story = { args: { disabled: true } };
