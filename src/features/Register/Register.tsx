import { DomainRegisterParameters, register } from 'entities/authentication';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Typography } from 'shared/designSystem';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useAsyncLoad } from 'shared/asyncUtils';

type RegisterForm = Pick<DomainRegisterParameters, 'username' | 'password'>;

interface RegisterProps {
  onSwitch: () => void;
}

export const Register: FunctionComponent<RegisterProps> = ({ onSwitch }) => {
  const { call: callRegister, isLoading: isRegisterLoading } = useAsyncLoad(register);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>();

  const navigate = useNavigate();

  const registerWithUsernameAndPassword = (parameters: DomainRegisterParameters): Promise<void> =>
    callRegister(parameters)
      .then(() => navigate('/'))
      .catch(() => setError('username', { type: 'notUnique' }));

  return (
    <div className="register">
      <Typography level={3} className="register__title">
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(registerWithUsernameAndPassword)} className="register__form">
        <div className="register__form-item">
          <Input
            label="Имя пользователя"
            autoFocus
            {...registerForm('username', { required: true, disabled: isRegisterLoading })}
          />
          {errors.username?.type === 'required' && (
            <Typography className="register__error" level={5}>
              Введите имя пользователя
            </Typography>
          )}
          {errors.username?.type === 'notUnique' && (
            <Typography className="register__error" level={5}>
              Имя пользователя не уникально
            </Typography>
          )}
        </div>

        <div className="register__form-item">
          <Input
            label="Пароль"
            {...registerForm('password', { required: true, disabled: isRegisterLoading })}
          />
          {errors.username?.type === 'required' && (
            <Typography className="register__error" level={5}>
              Введите пароль
            </Typography>
          )}
        </div>

        <Button submitButton disabled={isRegisterLoading}>
          Зарегистрироваться
        </Button>
      </form>

      <Button variant="outlined" size="s" onClick={onSwitch}>
        У меня уже есть аккаунт
      </Button>
    </div>
  );
};
