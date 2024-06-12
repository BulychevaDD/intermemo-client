import { FunctionComponent } from 'react';
import { WithChildren, WithClassName, WithDataTestId } from 'shared/jsxTypes';
import classNames from 'classnames';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  destroyOnClose?: boolean;
}

type Props = WithDataTestId<WithClassName<WithChildren<ModalProps>>>;

export const Modal: FunctionComponent<Props> = ({
  isOpen,
  children,
  className,
  destroyOnClose = false,
  ...restProps
}) => {
  if (destroyOnClose && !isOpen) {
    return null;
  }

  return (
    <div className="modal__wrapper">
      <div
        className={classNames(className, 'modal', {
          'modal--open': isOpen,
        })}
        data-testid={restProps['data-testid']}
        aria-modal
        aria-hidden={!isOpen}
        role="alertdialog"
      >
        {children}
      </div>
    </div>
  );
};
