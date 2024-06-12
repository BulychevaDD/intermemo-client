import { FunctionComponent, useState } from 'react';
import './CreateCard.css';
import { createCard, DomainCard, DomainCardCreateParameters } from 'entities/decks';
import { WithClassName } from 'shared/jsxTypes';
import { useAsyncLoad } from 'shared/asyncUtils';
import { useForm } from 'react-hook-form';
import { Button, Input, Modal, Typography } from 'shared/designSystem';

type CreateCardForm = Pick<DomainCardCreateParameters, 'question' | 'answer' | 'difficulty'>;

interface CreateCardProps {
  afterCreate?: (card: DomainCard) => void;
  deckId: number;
}

type Props = WithClassName<CreateCardProps>;

export const CreateCard: FunctionComponent<Props> = ({ className, afterCreate, deckId }) => {
  const { call: callCreateCard, isLoading: isCreateLoading } = useAsyncLoad(createCard);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors: formErrors },
    reset: resetForm,
  } = useForm<CreateCardForm>();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const closeCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(false);
  };

  const createCardAndCloseModal = (parameters: DomainCardCreateParameters) =>
    callCreateCard(deckId, parameters).then((createdCard) => {
      closeCreateModal();
      afterCreate?.(createdCard);
    });

  return (
    <>
      <Button size="m" onClick={() => setIsCreateModalOpen(true)} className={className}>
        Создать карточку
      </Button>
      <Modal isOpen={isCreateModalOpen} destroyOnClose className="create-card__modal">
        <Typography level={3} className="create-card__title">
          Создание карточки
        </Typography>
        <form onSubmit={handleSubmit(createCardAndCloseModal)} className="create-card__form">
          <Input
            label="Вопрос"
            {...registerForm('question', { required: true, disabled: isCreateLoading })}
          />
          {formErrors.question?.type === 'required' && (
            <Typography level={5} className="create-card__error">
              Обязательное поле
            </Typography>
          )}
          <Input
            label="Ответ"
            {...registerForm('answer', { required: true, disabled: isCreateLoading })}
          />
          {formErrors.answer?.type === 'required' && (
            <Typography level={5} className="create-card__error">
              Обязательное поле
            </Typography>
          )}
          <Input
            label="Сложность (1, 2, 3)"
            {...registerForm('difficulty', {
              required: true,
              disabled: isCreateLoading,
              pattern: /^[1-3]$/,
            })}
          />
          {formErrors.difficulty?.type === 'required' && (
            <Typography level={5} className="create-card__error">
              Обязательное поле
            </Typography>
          )}
          {formErrors.difficulty?.type === 'pattern' && (
            <Typography level={5} className="create-card__error">
              От 1 до 3
            </Typography>
          )}
          <div className="create-card__controls">
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
