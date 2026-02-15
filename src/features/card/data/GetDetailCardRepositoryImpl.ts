import { PCPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import type { CardEntity } from '../../home/domaine/entities/CardEntity';
import { GetDetailCardRepository } from '../domain/GetDetailCardRepository';
import { CardMapper } from './mappers/CardMapper';

export class GetDetailCardRepositoryImpl implements GetDetailCardRepository {
  constructor(private apiService: PCPowerScoreAPI) {}

  getCardById(cardId: string): Promise<CardEntity | null> {
    return this.apiService
      .searchCardById(cardId)
      .then(raw => CardMapper.toEntity(raw, cardId));
  }
}
