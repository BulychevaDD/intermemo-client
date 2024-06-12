import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { WithClassName } from 'shared/jsxTypes';
import { DeckItem } from '../DeckItem';
import { DomainDeck } from '../../decks.model';
import './DecksList.css';

interface DecksListProps {
  items: DomainDeck[];
  onItemClick?: (deckId: number) => void;
}

type Props = WithClassName<DecksListProps>;

export const DecksList: FunctionComponent<Props> = ({ items, className, onItemClick }) => (
  <div className={classNames(className, 'decks-list')}>
    {items.map((deckItem) => (
      <DeckItem
        key={deckItem.id}
        value={deckItem}
        className="decks-list__item"
        onClick={onItemClick && (() => onItemClick?.(deckItem.id))}
      />
    ))}
  </div>
);
