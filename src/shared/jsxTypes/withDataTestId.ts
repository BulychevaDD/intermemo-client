export type WithDataTestId<T> = T & Partial<Record<'data-testid', string>>;
