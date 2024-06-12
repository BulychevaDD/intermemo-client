import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/designSystem';
import { logOut } from 'entities/authentication';

export const LogOut: FunctionComponent = () => {
  const navigate = useNavigate();

  const logOutAndRedirectToAuthentication = (): Promise<void> =>
    logOut().then(() => navigate('/auth'));

  return (
    <Button onClick={logOutAndRedirectToAuthentication} variant="outlined">
      Выйти из аккаунта
    </Button>
  );
};
