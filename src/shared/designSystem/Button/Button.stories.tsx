import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: {
        Toned: 'toned',
        Outlined: 'outlined',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: {
        Large: 'l',
        Medium: 'm',
        Small: 's',
      },
    },
    disabled: {
      type: 'boolean',
    },
    children: {
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const buttonStory: Story = {
  args: {
    variant: 'toned',
    size: 'm',
    children: 'Button',
    disabled: false,
  },
};
