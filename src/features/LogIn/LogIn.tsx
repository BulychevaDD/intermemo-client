import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { DomainAuthenticationParameters, logIn } from 'entities/authentication';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography } from 'shared/designSystem';
import './LogIn.css';
import { useAsyncLoad } from 'shared/asyncUtils';

type LogInForm = Pick<DomainAuthenticationParameters, 'username' | 'password'>;

interface LogInProps {
  onSwitch: () => void;
}

export const LogIn: FunctionComponent<LogInProps> = ({ onSwitch }) => {
  const { call: callLogIn, isLoading: isLogInLoading } = useAsyncLoad(logIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LogInForm>();

  const navigate = useNavigate();

  const logInWithAuthenticationParameters = (
    parameters: DomainAuthenticationParameters,
  ): Promise<void> =>
    callLogIn(parameters)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setError('password', {
          type: 'wrongCredentials',
        });
      });

  return (
    <div className="log-in">
      <Typography level={3} className="login-in__title">
        Вход
      </Typography>
      <form className="log-in__form" onSubmit={handleSubmit(logInWithAuthenticationParameters)}>
        <div className="log-in__form-item">
          <Input
            label="Имя пользователя"
            autoFocus
            data-testid="log-in-login-field"
            {...register('username', { required: true, disabled: isLogInLoading })}
          />
          {errors.username?.type === 'required' && (
            <Typography className="log-in__error" level={5} data-testid="log-in-login-error">
              Введите имя пользователя
            </Typography>
          )}
        </div>

        <div className="log-in__form-item">
          <Input
            label="Пароль"
            data-testid="log-in-password-field"
            isPassword
            {...register('password', { required: true, disabled: isLogInLoading })}
          />
          {errors.password?.type === 'required' && (
            <Typography className="log-in__error" level={5} data-testid="log-in-password-error">
              Введите пароль
            </Typography>
          )}
        </div>

        <Button submitButton data-testid="log-in-submit-button" disabled={isLogInLoading}>
          Войти
        </Button>
        {errors.password?.type === 'wrongCredentials' && (
          <Typography className="log-in__error" level={5} data-testid="log-in-credentials-error">
            Неверный логин или пароль
          </Typography>
        )}
      </form>

      <Button variant="outlined" size="s" onClick={onSwitch}>
        Создать аккаунт
      </Button>
    </div>
  );
};
