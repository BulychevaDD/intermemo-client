import {
  DomainCard,
  DomainCardConfigurableParameters, DomainCardCreateParameters,
  DomainDeck,
  DomainDeckConfigurableParameters,
} from './decks.model';
import { Api } from './generatedApi';
import {
  convertDomainCardConfigurableParametersToDto, convertDomainCardCreateParametersToDto,
  convertDomainDeckConfigurableParametersToDto,
  convertDtoCardToDomain,
  convertDtoDeckToDomain,
} from './decks.converter';

const cardsApiService = new Api();

export const getDecks = (): Promise<DomainDeck[]> =>
  cardsApiService.getDecks().then((response) => response.data.map(convertDtoDeckToDomain));

export const createDeck = (parameters: DomainDeckConfigurableParameters): Promise<DomainDeck> =>
  cardsApiService
    .createDeck(convertDomainDeckConfigurableParametersToDto(parameters))
    .then((response) => convertDtoDeckToDomain(response.data));

export const getDeck = (deckId: number): Promise<DomainDeck> =>
  cardsApiService.getDeck(deckId).then((response) => convertDtoDeckToDomain(response.data));

export const updateDeck = (
  deckId: number,
  parameters: DomainDeckConfigurableParameters,
): Promise<DomainDeck> =>
  cardsApiService
    .updateDeck(deckId, convertDomainDeckConfigurableParametersToDto(parameters))
    .then((response) => convertDtoDeckToDomain(response.data));

export const deleteDeck = (deckId: number): Promise<void> =>
  cardsApiService.deleteDeck(deckId).then((response) => response.data);

export const getCards = (deckId: number): Promise<DomainCard[]> =>
  cardsApiService.getCards(deckId).then((response) => response.data.map(convertDtoCardToDomain));

export const createCard = (
  deckId: number,
  parameters: DomainCardCreateParameters,
): Promise<DomainCard> =>
  cardsApiService
    .createCard(deckId, convertDomainCardCreateParametersToDto(parameters))
    .then((response) => convertDtoCardToDomain(response.data));

export const updateCard = (
  deckId: number,
  cardId: number,
  parameters: DomainCardConfigurableParameters,
): Promise<DomainCard> =>
  cardsApiService
    .updateCard(deckId, cardId, convertDomainCardConfigurableParametersToDto(parameters))
    .then((response) => convertDtoCardToDomain(response.data));

export const deleteCard = (deckId: number, cardId: number): Promise<void> =>
  cardsApiService.deleteCard(deckId, cardId).then((response) => response.data);

export const getStudy = (deckId: number): Promise<DomainCard[]> =>
  cardsApiService.getStudy(deckId).then((response) => response.data.map(convertDtoCardToDomain));

export const studyCard = (deckId: number, cardId: number, difficulty: number): Promise<void> =>
  cardsApiService.studyCard(deckId, cardId, { difficulty }).then((response) => response.data);
