import { Api } from './generatedApi';
import {
  DomainAuthenticationParameters,
  DomainRegisterParameters,
  DomainUser,
} from './authentication.model';
import {
  convertDomainAuthenticationParametersToDto,
  convertDomainRegisterParametersToDto,
  convertDtoUserToDomain,
} from './authentication.converter';

const authenticationApiService = new Api();

export const logIn = (
  authenticationParameters: DomainAuthenticationParameters,
): Promise<DomainUser> =>
  authenticationApiService
    .login(convertDomainAuthenticationParametersToDto(authenticationParameters))
    .then((response) => convertDtoUserToDomain(response.data));

export const register = (registerParameters: DomainRegisterParameters): Promise<DomainUser> =>
  authenticationApiService
    .register(convertDomainRegisterParametersToDto(registerParameters))
    .then((response) => convertDtoUserToDomain(response.data));

export const logOut = (): Promise<void> =>
  authenticationApiService.logout().then((response) => response.data);
