import { createElement, FunctionComponent } from 'react';
import { WithChildren, WithClassName, WithDataTestId } from 'shared/jsxTypes';
import classNames from 'classnames';
import './Typography.css';

type TypographyLevel = 1 | 2 | 3 | 4 | 5;
type TypographyWeight = 'light' | 'regular' | 'bold';

const DEFAULT_WEIGHT: TypographyWeight = 'regular';

interface TypographyProps {
  level: TypographyLevel;
  weight?: TypographyWeight;
  as?: keyof HTMLElementTagNameMap;
}

type Props = WithDataTestId<WithClassName<WithChildren<TypographyProps>>>;

export const Typography: FunctionComponent<Props> = ({
  level,
  weight = DEFAULT_WEIGHT,
  className,
  children,
  as,
  ...restProps
}) =>
  createElement(
    as ?? 'p',
    {
      className: classNames(
        className,
        'typography',
        `typography--${level}`,
        `typography--${weight}`,
      ),
      'data-testid': restProps['data-testid'],
    },
    children,
  );
