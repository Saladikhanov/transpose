import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Inline } from '../Inline/Inline.tsx';
import { Avatar } from './Avatar.tsx';

const meta = { title: 'Atoms/Avatar', component: Avatar, args: { name: 'Ana Lima' } } satisfies Meta<
  typeof Avatar
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  play: async ({ canvas }) => {
    const avatar = canvas.getByRole('img', { name: 'Ana Lima' });
    await expect(avatar).toHaveTextContent('AL');
  },
};

export const BrokenImageFallsBack: Story = {
  args: { src: '/does-not-exist.png' },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('AL', {}, { timeout: 3000 })).toBeInTheDocument();
  },
};

export const Sizes: Story = {
  render: () => (
    <Inline gap="4">
      <Avatar name="Ana Lima" size="sm" />
      <Avatar name="Rui Costa" size="md" />
      <Avatar name="Marta Sousa" size="lg" />
    </Inline>
  ),
};
