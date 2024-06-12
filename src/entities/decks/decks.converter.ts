import {
  Card,
  CardConfigurableParameters,
  CardCreateParameters,
  Deck,
  DeckConfigurableParameters,
} from './generatedApi';
import {
  DomainCard,
  DomainCardConfigurableParameters,
  DomainCardCreateParameters,
  DomainDeck,
  DomainDeckConfigurableParameters,
} from './decks.model';

export const convertDtoDeckToDomain = (dtoDeck: Deck): DomainDeck => ({
  id: dtoDeck.id,
  name: dtoDeck.name,
  createdAt: dtoDeck.created_at,
  updatedAt: dtoDeck.updated_at,
  description: dtoDeck.description,
  lastStudy: dtoDeck.last_study,
  ...(dtoDeck.statistics
    ? {
        statistics: {
          cardsToday: dtoDeck.statistics.cards_today,
          cardsTomorrow: dtoDeck.statistics.cards_tomorrow,
          cardsAverageDifficulty: dtoDeck.statistics.cards_average_difficulty,
          cardsAmount: dtoDeck.statistics.cards_amount,
        },
      }
    : {}),
});

export const convertDomainDeckConfigurableParametersToDto = (
  parameters: DomainDeckConfigurableParameters,
): DeckConfigurableParameters => ({
  name: parameters.name,
  description: parameters.description,
});

export const convertDtoCardToDomain = (dtoCard: Card): DomainCard => ({
  id: dtoCard.id,
  question: dtoCard.question,
  answer: dtoCard.answer,
  deckId: dtoCard.deck_id,
  createdAt: dtoCard.created_at,
  updatedAt: dtoCard.updated_at,
  difficulty: dtoCard.difficulty,
  nextStudy: dtoCard.next_study,
});

export const convertDomainCardConfigurableParametersToDto = (
  parameters: DomainCardConfigurableParameters,
): CardConfigurableParameters => ({
  question: parameters.question,
  answer: parameters.answer,
});

export const convertDomainCardCreateParametersToDto = (
  parameters: DomainCardCreateParameters,
): CardCreateParameters => ({
  ...convertDomainCardConfigurableParametersToDto(parameters),
  difficulty: parameters.difficulty,
});
