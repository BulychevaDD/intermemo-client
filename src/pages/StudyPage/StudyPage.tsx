import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Study } from 'widgets/Study';

export const StudyPage: FunctionComponent = () => {
  const { deckId } = useParams();

  return <Study deckId={Number(deckId)} />;
};
