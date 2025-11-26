import { PCPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { CompareCardRepository } from '../domaine/CompareCardRepository';
import { MatchResultEntity } from '../domaine/entities/MatchResultEntity';
import { MatchResultMapper } from './mappers/MatchResultMapper';

export class CompareCardsRepositoryImpl implements CompareCardRepository {
  constructor(private apiService: PCPowerScoreAPI) {}

  compareCards(
    cardOne: CardEntity,
    cardTwo: CardEntity,
  ): Promise<MatchResultEntity> {
    return this.apiService
      .compareCards(cardOne, cardTwo)
      .then(result => MatchResultMapper.toEntity(result));
  }
}
