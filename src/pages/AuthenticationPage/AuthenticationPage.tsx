import { FunctionComponent } from 'react';
import './AuthenticationPage.css';
import { Authentication } from '../../widgets/Authentication/Authentication';

export const AuthenticationPage: FunctionComponent = () => (
  <div className="authentication-page">
    <Authentication />
  </div>
);
