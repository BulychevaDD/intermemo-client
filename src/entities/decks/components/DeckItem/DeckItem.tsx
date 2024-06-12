import { FunctionComponent } from 'react';
import './DeckItem.css';
import { WithClassName } from 'shared/jsxTypes';
import classNames from 'classnames';
import { Card, Typography } from 'shared/designSystem';
import { convertDateTimeToDate } from 'shared/datetime';
import { DomainDeck } from '../../decks.model';

interface DeckItemProps {
  value: DomainDeck;
  onClick?: () => void;
}

type Props = WithClassName<DeckItemProps>;

export const DeckItem: FunctionComponent<Props> = ({ value, className, onClick }) => (
  <Card onClick={onClick} className={classNames(className, 'deck-item')}>
    <Typography level={3} className="deck-item__name">
      <span className="deck-item__help-name">Колода:</span>
      {value.name}
    </Typography>
    {value.description && (
      <Typography level={4} className="deck-item__description">
        {value.description}
      </Typography>
    )}
    <Typography level={5} className="deck-item__created">
      Создано {convertDateTimeToDate(value.createdAt)}
    </Typography>
    {value.lastStudy && (
      <Typography level={5} className="deck-item__last-study">
        Последнее изучение {convertDateTimeToDate(value.lastStudy)}
      </Typography>
    )}
  </Card>
);
