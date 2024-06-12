import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { WithChildren, WithClassName, WithDataTestId } from 'shared/jsxTypes';
import './Button.css';

export type ButtonSize = 'l' | 'm' | 's';
export type ButtonVariant = 'toned' | 'outlined';

const DEFAULT_BUTTON_SIZE: ButtonSize = 'm';
const DEFAULT_BUTTON_VARIANT: ButtonVariant = 'toned';

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => unknown | Promise<unknown>;
  submitButton?: boolean;
}

type Props = WithDataTestId<WithClassName<WithChildren<ButtonProps>>>;

export const Button: FunctionComponent<Props> = ({
  disabled,
  size = DEFAULT_BUTTON_SIZE,
  variant = DEFAULT_BUTTON_VARIANT,
  className,
  children,
  onClick,
  submitButton = false,
  ...restProps
}) => (
  <button
    type={submitButton ? 'submit' : 'button'}
    onClick={onClick}
    disabled={disabled}
    className={classNames(className, 'button', `button--${size}`, `button--${variant}`)}
    data-testid={restProps['data-testid']}
  >
    {children}
  </button>
);
