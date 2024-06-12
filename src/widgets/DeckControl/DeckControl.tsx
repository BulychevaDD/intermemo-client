import { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import {
  DeckStore,
  deleteDeck,
  DomainDeckConfigurableParameters,
  updateDeck,
} from 'entities/decks';
import { Button, Typography } from 'shared/designSystem';
import { observer } from 'mobx-react-lite';
import './DeckControl.css';
import { EditableDeckInfo } from 'features/EditableDeckInfo';
import { runInAction } from 'mobx';
import { isInitialLoading } from 'shared/asyncUtils';
import { useNavigate } from 'react-router-dom';

interface DeckControlProps {
  deckId: number;
}

export const DeckControl: FunctionComponent<DeckControlProps> = observer(({ deckId }) => {
  const navigate = useNavigate();

  const deckStore = useMemo(() => new DeckStore(), []);

  useEffect(() => {
    deckStore.getData(deckId);
  }, [deckId, deckStore]);

  const deck = useMemo(() => deckStore.data, [deckStore.data]);

  const updateDeckInfo = useCallback(
    async (parameters: DomainDeckConfigurableParameters) => {
      runInAction(() => deckStore.updateDataBy(() => updateDeck(deckId, parameters)));
    },
    [deckId, deckStore],
  );

  const deleteDeckAndRedirect = () => deleteDeck(deckId).then(() => navigate('/'));

  const redirectToStudy = () => navigate('study');

  const isCardsEmpty = deck?.statistics?.cardsAmount === 0;
  const isTodayEmpty = deck?.statistics?.cardsToday === 0;

  if (isInitialLoading(deckStore)) {
    return (
      <Typography className="deck-control__loading" level={3}>
        Загрузка колоды...
      </Typography>
    );
  }

  if (!deck) {
    return null;
  }

  return (
    <div className="deck-control">
      <Button variant="outlined" onClick={deleteDeckAndRedirect} className="deck-control__delete">
        Удалить колоду
      </Button>
      <div className="deck-control__block">
        <EditableDeckInfo
          value={deck}
          onChange={updateDeckInfo}
          loading={deckStore.isLoading}
          className="deck-control__editable-info"
        />
        <Button
          onClick={redirectToStudy}
          className="deck-control__study"
          disabled={isCardsEmpty || isTodayEmpty}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {isCardsEmpty ? 'Создайте карточки' : isTodayEmpty ? 'На сегодня нет карточек' : 'Учить'}
        </Button>
      </div>
      {deck.statistics && (
        <div className="deck-control__statistics">
          <Typography className="deck-control__statistics-title" level={3}>
            Статистика колоды
          </Typography>
          <Typography className="deck-control__statistics-item" level={4}>
            Всего карточек: {deck.statistics.cardsAmount}
          </Typography>
          <Typography className="deck-control__statistics-item" level={4}>
            Сегодня к изучению: {deck.statistics.cardsToday}
          </Typography>
          <Typography className="deck-control__statistics-item" level={4}>
            Завтра к изучению: {deck.statistics.cardsTomorrow}
          </Typography>
          <Typography className="deck-control__statistics-item" level={4}>
            Средняя сложность: {deck.statistics.cardsAverageDifficulty.toFixed(2)}
          </Typography>
        </div>
      )}
    </div>
  );
});
