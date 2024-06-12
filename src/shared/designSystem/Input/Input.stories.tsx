import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
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
    label: {
      type: 'string',
    },
    disabled: {
      type: 'boolean',
    },
  },
};

export default meta;

export const inputStory: StoryObj<typeof Input> = {
  args: {
    label: 'Label',
    size: 'm',
    disabled: false,
  },
};
