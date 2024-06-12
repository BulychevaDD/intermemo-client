import {
  DomainAuthenticationParameters,
  DomainRegisterParameters,
  DomainUser,
} from './authentication.model';
import { AuthenticationParameters, RegisterParameters, User } from './generatedApi';

export const convertDomainAuthenticationParametersToDto = (
  authenticationParameters: DomainAuthenticationParameters,
): AuthenticationParameters => ({
  username: authenticationParameters.username,
  password: authenticationParameters.password,
});

export const convertDomainRegisterParametersToDto = (
  registerParameters: DomainRegisterParameters,
): RegisterParameters => ({
  username: registerParameters.username,
  password: registerParameters.password,
});

export const convertDtoUserToDomain = (user: User): DomainUser => ({
  username: user.username,
});
