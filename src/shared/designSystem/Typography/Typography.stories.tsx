import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  argTypes: {
    level: {
      control: {
        type: 'select',
      },
      options: [1, 2, 3, 4, 5],
    },
    weight: {
      control: {
        type: 'select',
      },
      options: {
        Light: 'light',
        Regular: 'regular',
        Bold: 'bold',
      },
    },
    children: {
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const typographyStory: Story = {
  args: {
    level: 3,
    weight: 'regular',
    children: 'Typography',
  },
};
