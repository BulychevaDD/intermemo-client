import { FunctionComponent, useState } from 'react';
import { createDeck, DomainDeck, DomainDeckConfigurableParameters } from 'entities/decks';
import { WithClassName } from 'shared/jsxTypes';
import { useAsyncLoad } from 'shared/asyncUtils';
import { useForm } from 'react-hook-form';
import { Button, Input, Modal, Typography } from 'shared/designSystem';
import './CreateDeck.css';

type CreateDeckForm = Pick<DomainDeckConfigurableParameters, 'name' | 'description'>;

interface CreateDeckProps {
  afterCreate?: (deck: DomainDeck) => void;
}

type Props = WithClassName<CreateDeckProps>;

export const CreateDeck: FunctionComponent<Props> = ({ afterCreate, className }) => {
  const { call: callCreateDeck, isLoading: isCreateLoading } = useAsyncLoad(createDeck);

  const {
    register: registerForm,
    formState: { errors: formErrors },
    handleSubmit,
    setError: setFormError,
    reset: resetForm,
  } = useForm<CreateDeckForm>();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const closeCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(false);
  };

  const createDeckAndCloseModal = (parameters: DomainDeckConfigurableParameters) =>
    callCreateDeck(parameters)
      .then((createdDeck) => {
        closeCreateModal();
        afterCreate?.(createdDeck);
      })
      .catch(() =>
        setFormError('name', {
          type: 'notUnique',
        }),
      );

  return (
    <>
      <Button size="l" onClick={() => setIsCreateModalOpen(true)} className={className}>
        Создать колоду карточек
      </Button>
      <Modal isOpen={isCreateModalOpen} destroyOnClose className="create-deck__modal">
        <Typography level={3} className="create-deck__title">
          Создание колоды карточек
        </Typography>
        <form onSubmit={handleSubmit(createDeckAndCloseModal)} className="create-deck__form">
          <Input
            label="Наименование колоды"
            {...registerForm('name', { required: true, disabled: isCreateLoading })}
          />
          {formErrors.name?.type === 'required' && (
            <Typography level={5} className="create-deck__error">
              Обязательное поле
            </Typography>
          )}
          {formErrors.name?.type === 'notUnique' && (
            <Typography level={5} className="create-deck__error">
              Имя не уникально
            </Typography>
          )}
          <Input label="Описание" {...registerForm('description', { disabled: isCreateLoading })} />
          <div className="create-deck__controls">
            <Button onClick={closeCreateModal} disabled={isCreateLoading} variant="outlined">
              Отменить
            </Button>
            <Button submitButton disabled={isCreateLoading}>
              Создать
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
