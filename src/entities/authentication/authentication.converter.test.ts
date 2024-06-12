import { describe, expect, it } from '@jest/globals';
import { DomainAuthenticationParameters } from './authentication.model';
import { AuthenticationParameters } from './generatedApi';
import { convertDomainAuthenticationParametersToDto } from './authentication.converter';

describe('Authentication Converter Test', () => {
  it('convertDomainAuthenticationParametersToDto - Function should convert Domain parameters to Dto', () => {
    const domainParameters: DomainAuthenticationParameters = {
      username: 'username',
      password: 'password',
    };

    const dtoParameters: AuthenticationParameters = {
      username: 'username',
      password: 'password',
    };

    expect(convertDomainAuthenticationParametersToDto(domainParameters)).toEqual(dtoParameters);
  });
});
