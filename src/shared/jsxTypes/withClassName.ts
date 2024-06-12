import { HTMLAttributes } from 'react';

export type WithClassName<T> = T & Pick<HTMLAttributes<HTMLElement>, 'className'>;
