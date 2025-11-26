import { PCPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { RawCard } from '../../../common/api/types';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { GetDetailCardRepository } from '../domain/GetDetailCardRepository';

export class GetDetailCardRepositoryImpl implements GetDetailCardRepository {
  constructor(private apiService: PCPowerScoreAPI) {}
  getCardById(cardId: string): Promise<CardEntity | null> {
    return this.apiService
      .searchCardById(cardId)
      .then(raw => this.mapRawCard(raw));
  }

  private mapRawCard(raw: RawCard): CardEntity {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type as CardEntity['type'],
      hp: raw.hp,
      imageUrl: raw.imageUrl,
      attacks: raw.attacks ?? [],
      weaknesses: raw.weaknesses ?? [],
      resistances: raw.resistances ?? [],
      rarity: raw.rarity ?? '',
    };
  }
}
