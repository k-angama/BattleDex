import { PCPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { APICardsRepository } from '../domaine/APICardsRepository';
import { SearchCardSuggestionEntity } from '../domaine/entities/SearchCardSuggestionEntity';
import { SearchCardMapper } from './mappers/SearchCardMapper';

export class APICardsRepositoryImpl implements APICardsRepository {
  constructor(private apiService: PCPowerScoreAPI) {}

  getCardNames(name: string): Promise<SearchCardSuggestionEntity[]> {
    return this.apiService.searchCardsByName(name).then(raw =>
      raw.map(SearchCardMapper.toEntity),
    );
  }
}
