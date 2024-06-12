import { describe, it, expect, jest } from '@jest/globals';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { logIn } from 'entities/authentication';
import { redirect } from 'react-router-dom';
import { LogIn } from './LogIn';

jest.mock('entities/authentication', () => ({
  ...jest.requireActual<object>('entities/authentication'),
  logIn: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<object>('react-router-dom'),
  redirect: jest.fn(),
}));

const CALLED_ONCE = 1;

describe('LogIn Component Test', () => {
  it('LogIn - Component should show error when one or more fields are empty by clicking submit button', async () => {
    render(<LogIn onSwitch={jest.fn()} />);

    const submitButton = screen.getByTestId('log-in-submit-button');
    const loginField = screen.getByTestId('log-in-login-field');
    const passwordField = screen.getByTestId('log-in-password-field');

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('log-in-login-error')).not.toBeNull();
      expect(screen.getByTestId('log-in-password-error')).not.toBeNull();
    });

    act(() => {
      fireEvent.change(loginField, { target: { value: 'test' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('log-in-login-error')).toBeNull();
      expect(screen.getByTestId('log-in-password-error')).not.toBeNull();
    });

    act(() => {
      fireEvent.change(passwordField, { target: { value: 'test' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('log-in-login-error')).toBeNull();
      expect(screen.queryByTestId('log-in-password-error')).toBeNull();
    });
  });

  it('LogIn - Component should show error when api service throws', async () => {
    (logIn as jest.Mock).mockImplementationOnce(jest.fn(() => Promise.reject()));

    render(<LogIn onSwitch={jest.fn()} />);

    const submitButton = screen.getByTestId('log-in-submit-button');
    const loginField = screen.getByTestId('log-in-login-field');
    const passwordField = screen.getByTestId('log-in-password-field');

    act(() => {
      fireEvent.change(loginField, { target: { value: 'test' } });
      fireEvent.change(passwordField, { target: { value: 'test' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('log-in-credentials-error')).not.toBeNull();
    });
  });

  it('LogIn - Component should redirect on successful log in', async () => {
    render(<LogIn onSwitch={jest.fn()} />);

    const submitButton = screen.getByTestId('log-in-submit-button');
    const loginField = screen.getByTestId('log-in-login-field');
    const passwordField = screen.getByTestId('log-in-password-field');

    act(() => {
      fireEvent.change(loginField, { target: { value: 'test' } });
      fireEvent.change(passwordField, { target: { value: 'test' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(redirect).toBeCalledTimes(CALLED_ONCE);
    });
  });
});
