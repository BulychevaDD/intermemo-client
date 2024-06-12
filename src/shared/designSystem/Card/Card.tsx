import { FunctionComponent } from 'react';
import { WithChildren, WithClassName } from 'shared/jsxTypes';
import classNames from 'classnames';
import './Card.css';

interface CardProps {
  onClick?: () => void;
}

type Props = WithChildren<WithClassName<CardProps>>;

export const Card: FunctionComponent<Props> = ({ className, onClick, children }) => {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames(className, 'card', 'card--clickable')}
      >
        {children}
      </button>
    );
  }

  return <div className={classNames(className, 'card')}>{children}</div>;
};
