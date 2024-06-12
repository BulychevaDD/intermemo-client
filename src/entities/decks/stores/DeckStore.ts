import { MobxAsyncStore } from 'shared/asyncUtils';
import { DomainDeck } from '../decks.model';
import { getDeck } from '../decks.api';

export class DeckStore extends MobxAsyncStore<[number], DomainDeck> {
  callback = getDeck;
}
