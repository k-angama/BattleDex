import { StoredCardRaw } from '../../../../common/db/dto/StoredCardRaw';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';

export class StoredCardMapper {
  static toEntity(raw: StoredCardRaw): CardEntity {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type,
      hp: raw.hp,
      setName: raw.setName,
      imageUrl: raw.imageUrl,
      attacks: raw.attacks ?? [],
      weaknesses: raw.weaknesses ?? [],
      resistances: raw.resistances ?? [],
    };
  }

  static fromEntity(entity: CardEntity): StoredCardRaw {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      hp: entity.hp,
      setName: entity.setName,
      imageUrl: entity.imageUrl,
      attacks: entity.attacks.map(attack => ({
        name: attack.name,
        damage: attack.damage,
        cost: attack.cost,
      })),
      weaknesses: entity.weaknesses,
      resistances: entity.resistances,
    };
  }
}
