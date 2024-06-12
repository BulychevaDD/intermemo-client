import { describe, it, expect } from '@jest/globals';
import { act, render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component Test', () => {
  it('Modal - Component should hide and show via prop', () => {
    const { rerender } = render(<Modal isOpen data-testid="modal" />);

    const modalElement = screen.getByTestId('modal');

    expect(modalElement.getAttribute('aria-hidden')).toBe('false');

    act(() => {
      rerender(<Modal isOpen={false} />);
    });

    expect(modalElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('Modal - Component should not render when destroyOnClose passed', () => {
    const { rerender } = render(<Modal isOpen data-testid="modal" destroyOnClose />);

    expect(screen.getByTestId('modal')).not.toBeNull();

    rerender(<Modal isOpen={false} data-testid="modal" destroyOnClose />);

    expect(screen.queryByTestId('modal')).toBeNull();
  });
});
