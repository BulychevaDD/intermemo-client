import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import './Study.css';
import { isInitialLoading } from 'shared/asyncUtils';
import { Button, Typography } from 'shared/designSystem';
import { runInAction, toJS } from 'mobx';
import { CardDifficulty, studyCard, StudyCardsStore } from 'entities/decks';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

interface StudyProps {
  deckId: number;
}

export const Study: FunctionComponent<StudyProps> = observer(({ deckId }) => {
  const studyCardsStore = useMemo(() => new StudyCardsStore(), []);

  useEffect(() => {
    studyCardsStore.getData(deckId);
  }, [deckId, studyCardsStore]);

  const studyCards = useMemo(() => toJS(studyCardsStore.data), [studyCardsStore.data]);

  const activeCard = useMemo(() => studyCards?.[0], [studyCards]);
  const [isFront, setIsFront] = useState(true);

  const answerAndExclude = (difficulty: number): Promise<void> =>
    studyCard(deckId, activeCard.id, difficulty).then(() => {
      setIsFront(true);
      runInAction(() => studyCardsStore.excludeCard(activeCard.id));
    });

  if (isInitialLoading(studyCardsStore)) {
    return (
      <Typography className="study__loading" level={3}>
        Загрузка колоды...
      </Typography>
    );
  }

  if (!studyCards) {
    return null;
  }

  if (studyCards.length === 0) {
    return (
      <div className="study__done">
        <Typography className="study__done-title" level={3}>
          На сегодня все! Завтра будут новые карточки.
        </Typography>
        <Link to="/">
          <Button className="study__done-back">Перейти к колодам карточек</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="study">
      <Typography className="study__card" level={3}>
        {isFront ? activeCard.question : activeCard.answer}
      </Typography>
      {isFront ? (
        <Button onClick={() => setIsFront(false)}>Перевернуть</Button>
      ) : (
        <div className="study__controls">
          <Button
            onClick={() => answerAndExclude(CardDifficulty.PERFECT)}
            className="study__perfect"
          >
            Вспомнил
          </Button>
          <Button
            onClick={() => answerAndExclude(CardDifficulty.REMEMBERED)}
            className="study__remembered"
          >
            Вспомнил (более 10 сек)
          </Button>
          <Button onClick={() => answerAndExclude(CardDifficulty.CLOSE)} className="study__close">
            Ошибся
          </Button>
          <Button
            onClick={() => answerAndExclude(CardDifficulty.BLACKOUT)}
            className="study__blackout"
          >
            Не вспомнил
          </Button>
        </div>
      )}
    </div>
  );
});
