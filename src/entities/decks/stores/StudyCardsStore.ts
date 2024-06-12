import { MobxAsyncStore } from 'shared/asyncUtils';
import { DomainCard } from '../decks.model';
import { getStudy } from '../decks.api';

export class StudyCardsStore extends MobxAsyncStore<unknown[], DomainCard[]> {
  callback = getStudy;

  public excludeCard(cardId: number): void {
    this.updateLocally(this.data.filter((cardItem) => cardItem.id !== cardId));
  }
}
