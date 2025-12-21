import { CardRaw } from '../../../../common/api/dto/CardRaw';
import { StoredCardRaw } from '../../../../common/db/dto/StoredCardRaw';
import { CardEntity } from '../../domaine/entities/CardEntity';

export class CardMapper {
  static toEntity(raw: CardRaw | StoredCardRaw): CardEntity {
    return {
      id: raw.id ?? '',
      name: raw.name ?? '-',
      type: raw.type ?? '-',
      hp: (raw.hp ?? 0) > 0 ? raw.hp?.toString() ?? '-' : '-',
      setName: raw.setName ?? '',
      imageUrl: raw.imageUrl,
      attacks: (raw.attacks ?? []).map(attack => ({
        name: attack.name ?? '-',
        damage: attack.damage ?? 0,
        cost: (attack.cost ?? []).map(c => ({
          type: c.type ?? '-',
          name: c.name ?? '-',
        })),
      })),
      weaknesses: (raw.weaknesses ?? []).map(weakness => ({
        type: weakness.type ?? '-',
        name: weakness.name ?? '-',
        value: weakness.value ?? '-',
      })),
      resistances: (raw.resistances ?? []).map(resistance => ({
        type: resistance.type ?? '-',
        name: resistance.name ?? '-',
        value: resistance.value ?? '-',
      })),
    };
  }
  static fromEntity(entity: CardEntity): CardRaw | StoredCardRaw {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      hp: entity.hp === '-' ? 0 : parseInt(entity.hp, 10),
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
