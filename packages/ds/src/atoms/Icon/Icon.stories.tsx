import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Inline } from '../Inline/Inline.tsx';
import { Icon } from './Icon.tsx';
import { icons, type IconName } from './icons.ts';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  args: { name: 'search' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  },
};

export const WithLabel: Story = {
  args: { name: 'circle-alert', tone: 'danger', label: 'Error' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Error' })).toBeInTheDocument();
  },
};

export const AllowedSet: Story = {
  render: () => (
    <Inline gap="4">
      {(Object.keys(icons) as IconName[]).map((name) => (
        <Icon key={name} name={name} label={name} size="lg" />
      ))}
    </Inline>
  ),
};
