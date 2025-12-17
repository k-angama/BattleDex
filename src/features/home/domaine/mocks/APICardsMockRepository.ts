import { searchCardSuggestionsMock } from '../../../../common/mocks/searchCardSuggestions.mock';
import { APICardsRepository } from '../APICardsRepository';
import { SearchCardSuggestionEntity } from '../entities/SearchCardSuggestionEntity';

export class APICardsMockRepository implements APICardsRepository {
  async getCardNames(name: string): Promise<SearchCardSuggestionEntity[]> {
    await new Promise<void>(async resolve => {
      await setTimeout(resolve, 500);
    });
    return searchCardSuggestionsMock.filter(card =>
      card.title.toLowerCase().includes(name.toLowerCase()),
    );
  }
}
