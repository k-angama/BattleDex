import { SearchCardSuggestionEntity } from './entities/SearchCardSuggestionEntity';

export interface APICardsRepository {
  getCardNames(name: string): Promise<SearchCardSuggestionEntity[]>;
}
