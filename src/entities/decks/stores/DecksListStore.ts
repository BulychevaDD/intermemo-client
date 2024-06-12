import { MobxAsyncStore } from 'shared/asyncUtils';
import { DomainDeck } from '../decks.model';
import { getDecks } from '../decks.api';

export class DecksListStore extends MobxAsyncStore<unknown[], DomainDeck[]> {
  callback = getDecks;
}
