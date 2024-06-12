import { WithClassName } from 'shared/jsxTypes';
import { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { DomainCard } from '../../decks.model';
import { CardItem } from '../CardItem';
import './CardsList.css';
import { Typography } from '../../../../shared/designSystem';

interface CardsListProps {
  items: DomainCard[];
  onItemClick?: (cardId: number) => void;
}

type Props = WithClassName<CardsListProps>;

export const CardsList: FunctionComponent<Props> = ({ items, onItemClick, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <Typography level={3} className="cards-list__show">
          {isOpen ? 'Скрыть карточки' : 'Показать карточки'}
        </Typography>
      </button>
      {isOpen && (
        <div className={classNames(className, 'cards-list')}>
          {items.map((cardItem) => (
            <CardItem
              key={cardItem.id}
              value={cardItem}
              className="cards-list__item"
              onClick={onItemClick && (() => onItemClick?.(cardItem.id))}
            />
          ))}
        </div>
      )}
    </>
  );
};
