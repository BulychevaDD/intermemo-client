import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component Test', () => {
  it('Input - Label and Input IDs should be the same', () => {
    render(<Input label="Test Label" />);

    expect(screen.getByTestId('input').getAttribute('id')).toEqual(
      screen.getByTestId('label').getAttribute('for'),
    );
  });
});
