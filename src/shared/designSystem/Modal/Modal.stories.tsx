import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  argTypes: {
    isOpen: {
      type: 'boolean',
    },
    children: {
      type: 'string',
    },
    destroyOnClose: {
      type: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const modalStory: Story = {
  args: {
    isOpen: true,
    children: 'Modal',
    destroyOnClose: false,
  },
};
