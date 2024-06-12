import { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { CreateDeck } from 'features/CreateDeck';
import './DecksListControl.css';
import { DecksListStore, DomainDeck, DecksList } from 'entities/decks';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { isLoadingOrIdle } from 'shared/asyncUtils';
import { Typography } from 'shared/designSystem';
import { useNavigate } from 'react-router-dom';

export const DecksListControl: FunctionComponent = observer(() => {
  const decksListStore = useMemo(() => new DecksListStore(), []);

  useEffect(() => {
    decksListStore.getData();
  }, [decksListStore]);

  const decks = useMemo(() => toJS(decksListStore.data), [decksListStore.data]);

  const enrichDecksWithItem = (deck: DomainDeck) => {
    decksListStore.updateLocally([deck, ...decks]);
  };

  const navigate = useNavigate();

  const navigateToDeckItemPage = useCallback(
    (deckId: number): void => {
      navigate(`/decks/${deckId}`);
    },
    [navigate],
  );

  if (isLoadingOrIdle(decksListStore)) {
    return (
      <Typography className="decks-list-control__loading" level={3}>
        Загрузка...
      </Typography>
    );
  }

  if (!decks) {
    return null;
  }

  return (
    <div className="decks-list-control">
      <Typography level={3} className="decks-list-control__title">
        Всего колод: {decks.length}
      </Typography>
      <CreateDeck className="decks-list-control__create" afterCreate={enrichDecksWithItem} />
      <DecksList items={decks} onItemClick={navigateToDeckItemPage} />
    </div>
  );
});
