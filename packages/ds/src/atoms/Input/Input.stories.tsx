import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { Input } from './Input.tsx';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    'aria-label': 'Email',
    type: 'email',
    name: 'email',
    autoComplete: 'email',
    placeholder: 'name@company.com',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await userEvent.type(input, 'ana@example.com');
    await expect(input).toHaveValue('ana@example.com');
    await expect(input.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
  },
};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'ana@' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 'ana@example.com' } };

export const KeyboardFocus: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('textbox', { name: 'Email' })).toHaveFocus();
  },
};
