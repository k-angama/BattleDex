import { APICardsRepository } from '../APICardsRepository';
import { SearchCardSuggestionEntity } from '../entities/SearchCardSuggestionEntity';

export class SearchCardNamesUseCase {
  private debounceRef: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly repository: APICardsRepository,
    private readonly debounceDelay?: number,
  ) {}

  async execute(name: string): Promise<SearchCardSuggestionEntity[]> {
    return new Promise((resolve, reject) => {
      if (this.debounceRef) {
        clearTimeout(this.debounceRef);
      }

      this.debounceRef = setTimeout(async () => {
        try {
          const results = await this.search(name);
          resolve(results);
        } catch (error) {
          reject(error);
        }
      }, this.debounceDelay ?? 500);
    });
  }

  private async search(name: string): Promise<SearchCardSuggestionEntity[]> {
    const results = await this.repository.getCardNames(name);
    return results;
  }

  dispose() {
    if (this.debounceRef) {
      clearTimeout(this.debounceRef);
      this.debounceRef = null;
    }
  }
}
