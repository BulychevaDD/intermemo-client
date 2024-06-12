import { DomainDeck, DomainDeckConfigurableParameters } from 'entities/decks';
import { WithClassName } from 'shared/jsxTypes';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Typography } from 'shared/designSystem';
import classNames from 'classnames';
import './EditableDeckInfo.css';

type DeckInfoForm = Pick<DomainDeckConfigurableParameters, 'name' | 'description'>;

interface EditableDeckInfoProps {
  value: DomainDeck;
  onChange: (values: DomainDeckConfigurableParameters) => Promise<unknown>;
  loading: boolean;
}

type Props = WithClassName<EditableDeckInfoProps>;

export const EditableDeckInfo: FunctionComponent<Props> = ({
  value,
  className,
  onChange,
  loading,
}) => {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<DeckInfoForm>({
    defaultValues: value,
  });

  return (
    <form className={classNames(className, 'editable-deck-info')} onSubmit={handleSubmit(onChange)}>
      <Input
        label="Наименование колоды"
        {...registerForm('name', { disabled: loading, required: true })}
      />
      {errors.name?.type === 'required' && (
        <Typography level={5} className="editable-deck-info__error">
          Обязательное поле
        </Typography>
      )}
      <Input label="Описание" {...registerForm('description', { disabled: loading })} />
      <Button submitButton disabled={loading}>
        Сохранить изменения
      </Button>
    </form>
  );
};
