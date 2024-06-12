import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import {
  CardsList,
  CardsListStore,
  deleteCard,
  DomainCard,
  DomainCardConfigurableParameters,
  updateCard,
} from 'entities/decks';
import { action, runInAction, toJS } from 'mobx';
import { Typography } from 'shared/designSystem';
import { isInitialLoading } from 'shared/asyncUtils';
import { observer } from 'mobx-react-lite';
import { CreateCard } from 'features/CreateCard';
import './CardsListControl.css';
import { EditCardModal } from 'features/EditCardModal';

interface CardsListControlProps {
  deckId: number;
  onUpdate: () => void;
}

export const CardsListControl: FunctionComponent<CardsListControlProps> = observer(
  ({ deckId, onUpdate }) => {
    const cardsListStore = useMemo(() => new CardsListStore(), []);

    useEffect(() => {
      cardsListStore.getData(deckId);
    }, [cardsListStore, deckId]);

    const cardsList = useMemo(() => toJS(cardsListStore.data), [cardsListStore.data]);

    const enrichCardsListWithItem = (card: DomainCard): void => {
      runInAction(() => cardsListStore.updateLocally([card, ...cardsList]));
      onUpdate();
    };

    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const activeCard = useMemo(
      () => cardsList?.find((cardItem) => cardItem.id === activeCardId),
      [activeCardId, cardsList],
    );

    const closeCard = () => setActiveCardId(null);

    const deleteCardById = (cardId: number): Promise<void> =>
      deleteCard(deckId, cardId).then(action(() => cardsListStore.excludeCard(cardId)));

    const updateCardById = (
      cardId: number,
      newValues: DomainCardConfigurableParameters,
    ): Promise<void> =>
      updateCard(deckId, cardId, newValues).then(
        action(() => cardsListStore.updateCard(cardId, newValues)),
      );

    if (isInitialLoading(cardsListStore)) {
      return (
        <Typography className="cards-list-control__loading" level={3}>
          Загрузка карточек...
        </Typography>
      );
    }

    if (!cardsList) {
      return null;
    }

    return (
      <>
        <div className="cards-list-control">
          <CreateCard
            deckId={deckId}
            className="cards-list-control__create"
            afterCreate={enrichCardsListWithItem}
          />
          <CardsList items={cardsList} onItemClick={setActiveCardId} />
        </div>
        {Boolean(activeCard) && (
          <EditCardModal
            card={activeCard}
            onEdit={updateCardById}
            onDelete={deleteCardById}
            onClose={closeCard}
          />
        )}
      </>
    );
  },
);
