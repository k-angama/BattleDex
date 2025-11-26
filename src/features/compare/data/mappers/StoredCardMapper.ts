import { RawStoredCard } from '../../../../common/db/types';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';

export class StoredCardMapper {
  static toEntity(raw: RawStoredCard): CardEntity {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type as CardEntity['type'],
      hp: raw.hp,
      imageUrl: raw.imageUrl,
      attacks: raw.attacks ?? [],
      weaknesses: raw.weaknesses ?? [],
      resistances: raw.resistances ?? [],
    };
  }

  static fromEntity(entity: CardEntity): RawStoredCard {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      hp: entity.hp,
      imageUrl: entity.imageUrl,
      attacks: entity.attacks,
      weaknesses: entity.weaknesses,
      resistances: entity.resistances,
    };
  }
}
