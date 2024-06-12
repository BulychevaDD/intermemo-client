import { FunctionComponent, useState } from 'react';
import './EditCardModal.css';
import { DomainCard, DomainCardConfigurableParameters } from 'entities/decks';
import { Button, Input, Modal, Typography } from 'shared/designSystem';
import { useForm } from 'react-hook-form';
import { convertDateTimeToDate } from '../../shared/datetime';

type EditCardForm = Pick<DomainCardConfigurableParameters, 'answer' | 'question'>;

interface EditCardModalProps {
  card: DomainCard;
  onEdit: (cardId: number, editedCard: DomainCardConfigurableParameters) => Promise<void>;
  onDelete: (cardId: number) => Promise<void>;
  onClose: () => void;
}

export const EditCardModal: FunctionComponent<EditCardModalProps> = ({
  onEdit,
  card,
  onDelete,
  onClose,
}) => {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCardForm>({
    defaultValues: card,
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitWithLoading = async (callback: () => Promise<void>): Promise<void> => {
    setIsLoading(true);

    try {
      await callback();

      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen className="edit-card-modal">
      <form
        className="edit-card-modal__form"
        onSubmit={handleSubmit((values) => submitWithLoading(() => onEdit(card.id, values)))}
      >
        <Input
          label="Вопрос"
          {...registerForm('question', {
            disabled: isLoading,
            required: true,
          })}
        />
        {errors.question?.type === 'required' && (
          <Typography level={5} className="edit-card-modal__error">
            Обязательное поле
          </Typography>
        )}
        <Input
          label="Ответ"
          {...registerForm('answer', {
            disabled: isLoading,
            required: true,
          })}
        />
        {errors.answer?.type === 'required' && (
          <Typography level={5} className="edit-card-modal__error">
            Обязательное поле
          </Typography>
        )}
        <div className="edit-card-modal__controls">
          <Button variant="outlined" disabled={isLoading} onClick={onClose}>
            Отменить
          </Button>
          <Button submitButton disabled={isLoading}>
            Сохранить
          </Button>
          <Button
            variant="outlined"
            disabled={isLoading}
            onClick={() => submitWithLoading(() => onDelete(card.id))}
            className="edit-card-modal__delete"
          >
            Удалить
          </Button>
        </div>
      </form>
      <Typography level={5} className="edit-card-modal__next-study">
        Появится в обучении {convertDateTimeToDate(card.nextStudy)}
      </Typography>
    </Modal>
  );
};
