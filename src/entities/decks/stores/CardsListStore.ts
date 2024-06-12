import { MobxAsyncStore } from 'shared/asyncUtils';
import { DomainCard, DomainCardConfigurableParameters } from '../decks.model';
import { getCards } from '../decks.api';

export class CardsListStore extends MobxAsyncStore<unknown[], DomainCard[]> {
  callback = getCards;

  public excludeCard(cardId: number) {
    this.updateLocally(this.data.filter((cardItem) => cardItem.id !== cardId));
  }

  public updateCard(cardId: number, newValues: DomainCardConfigurableParameters) {
    this.updateLocally(
      this.data.map((cardItem) => {
        if (cardItem.id === cardId) {
          return {
            ...cardItem,
            ...newValues,
          };
        }
        return cardItem;
      }),
    );
  }
}
