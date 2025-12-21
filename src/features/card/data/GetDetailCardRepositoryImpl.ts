import { CardRaw } from '../../../common/api/dto/CardRaw';
import { PCPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { GetDetailCardRepository } from '../domain/GetDetailCardRepository';

export class GetDetailCardRepositoryImpl implements GetDetailCardRepository {
  constructor(private apiService: PCPowerScoreAPI) {}
  getCardById(cardId: string): Promise<CardEntity | null> {
    return this.apiService
      .searchCardById(cardId)
      .then(raw => this.mapCardRaw(raw));
  }

  private mapCardRaw(raw: CardRaw): CardEntity {
    return {
      id: raw.id ?? '',
      name: raw.name ?? '-',
      type: raw.type as CardEntity['type'],
      hp: (raw.hp ?? 0) > 0 ? raw.hp?.toString() ?? '-' : '-',
      imageUrl: raw.imageUrl,
      attacks:
        raw.attacks?.map(attack => ({
          name: attack.name,
          damage: attack.damage,
          cost: attack.cost,
        })) ?? [],
      weaknesses:
        raw.weaknesses?.map(weakness => ({
          type: weakness.type,
          name: weakness.type,
          value: weakness.value,
        })) ?? [],
      resistances:
        raw.resistances?.map(resistance => ({
          type: resistance.type,
          name: resistance.type,
          value: resistance.value,
        })) ?? [],
      rarity: raw.rarity ?? '',
      setName: raw.setName ?? '',
    };
  }
}
