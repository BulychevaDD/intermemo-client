import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

const CALLED_ONCE = 1;

describe('Button Component Test', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('Button - Component should call onClick when is not disabled and do not when disabled', () => {
    const { rerender } = render(<Button onClick={mockOnClick} disabled />);

    const buttonElement = screen.getByRole('button');

    act(() => {
      fireEvent.click(buttonElement);
    });

    expect(mockOnClick).not.toBeCalled();

    rerender(<Button onClick={mockOnClick} />);

    act(() => {
      fireEvent.click(buttonElement);
    });

    expect(mockOnClick).toBeCalledTimes(CALLED_ONCE);
  });
});
