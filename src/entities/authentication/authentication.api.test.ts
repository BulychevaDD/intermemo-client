import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Api } from './generatedApi';
import { mockDomainAuthenticationParameters } from './authentication.mock';
import { logIn } from './authentication.api';

jest.mock('./generatedApi.ts', () => {
  const mockAuthApi = {
    login: jest.fn(() => Promise.resolve({})),
  };

  return {
    ...jest.requireActual<object>('./generatedApi'),
    Api: class {
      login = mockAuthApi.login;
    },
  };
});

const authApiService = new Api();

const CALLED_ONCE = 1;

describe('Login API Test', () => {
  beforeEach(() => {
    (authApiService.login as jest.Mock).mockClear();
  });

  it('login - Function should invoke api method once when called', async () => {
    expect(authApiService.login).not.toBeCalled();

    await logIn({ ...mockDomainAuthenticationParameters });

    expect(authApiService.login).toBeCalledTimes(CALLED_ONCE);
  });
});
