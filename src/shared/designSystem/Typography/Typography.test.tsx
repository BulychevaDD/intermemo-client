import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography Component Test', () => {
  it('Typography - Component should be P element by default', () => {
    render(<Typography level={3} data-testid="typography" />);

    const typographyElement = screen.getByTestId('typography');

    expect(typographyElement.tagName).toEqual('P');
  });

  it('Typography - Component should override default element', () => {
    render(<Typography level={3} as="h3" data-testid="typography" />);

    const typographyElement = screen.getByTestId('typography');

    expect(typographyElement.tagName).toEqual('H3');
  });
});
