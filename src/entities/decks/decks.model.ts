export interface DomainStatistics {
  cardsAmount: number;
  cardsAverageDifficulty: number;
  cardsToday: number;
  cardsTomorrow: number;
}

export interface DomainDeck {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  lastStudy: string;
  statistics?: DomainStatistics;
}

export interface DomainDeckConfigurableParameters {
  name: string;
  description?: string;
}

export interface DomainCard {
  id: number;
  question: string;
  answer: string;
  deckId: number;
  createdAt: string;
  updatedAt: string;
  difficulty: number;
  nextStudy: string;
}

export interface DomainCardConfigurableParameters {
  question: string;
  answer: string;
}

export interface DomainCardCreateParameters extends DomainCardConfigurableParameters {
  difficulty: number;
}
