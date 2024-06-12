import { FunctionComponent } from 'react';
import './CardItem.css';
import { WithClassName } from 'shared/jsxTypes';
import classNames from 'classnames';
import { Card, Typography } from 'shared/designSystem';
import { convertDateTimeToDate } from 'shared/datetime';
import { DomainCard } from '../../decks.model';

interface CardItemProps {
  value: DomainCard;
  onClick?: () => void;
}

type Props = WithClassName<CardItemProps>;

export const CardItem: FunctionComponent<Props> = ({ value, onClick, className }) => (
  <Card onClick={onClick} className={classNames(className, 'card-item')}>
    <Typography level={3} className="card-item__question">
      {value.question}
    </Typography>
    <Typography level={5} className="card-item__created">
      Создано {convertDateTimeToDate(value.createdAt)}
    </Typography>
    <Typography level={5} className="card-item__difficulty">
      Сложность: {value.difficulty}
    </Typography>
  </Card>
);
