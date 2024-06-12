import {
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useId,
} from 'react';
import classNames from 'classnames';
import './Input.css';

type InputSize = 'l' | 'm' | 's';

const DEFAULT_SIZE: InputSize = 'm';

interface InputProps {
  size?: InputSize;
  label: ReactNode;
  disabled?: boolean;
  isPassword?: boolean;
}

type Props = InputProps & HTMLAttributes<HTMLInputElement>;

export const Input: FunctionComponent<Props> = forwardRef(
  (
    { className, label, size = DEFAULT_SIZE, disabled, isPassword, ...restProps }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const uniqueId = useId();

    return (
      <div
        className={classNames(className, 'input', `input--${size}`, {
          'input--disabled': disabled,
        })}
      >
        <label htmlFor={uniqueId} data-testid="label">
          {label}
        </label>
        <input
          {...(isPassword ? { type: 'password' } : {})}
          ref={ref}
          data-testid="input"
          disabled={disabled}
          id={uniqueId}
          {...restProps}
        />
      </div>
    );
  },
);
