import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DeckControl } from 'widgets/DeckControl';
import { CardsListControl } from 'widgets/CardsListControl';

export const DeckPage: FunctionComponent = () => {
  const { deckId } = useParams();

  const [key, setKey] = useState(0);

  return (
    <div className="deck-page">
      <DeckControl deckId={Number(deckId)} key={key} />
      <CardsListControl onUpdate={() => setKey((prev) => prev + 1)} deckId={Number(deckId)} />
    </div>
  );
};
