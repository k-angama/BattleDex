import { CardRaw } from '../../../../common/api/dto/CardRaw';
import type { CardEntity } from '../../../home/domaine/entities/CardEntity';

export class CardMapper {
  static toEntity(raw: CardRaw, cardId: string): CardEntity {
    return {
      id: cardId,
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
          type: weakness.type ?? '',
          name: weakness.type ?? '',
          value: weakness.value ?? '',
        })) ?? [],
      resistances:
        raw.resistances?.map(resistance => ({
          type: resistance.type ?? '',
          name: resistance.type ?? '',
          value: resistance.value ?? '',
        })) ?? [],
      rarity: raw.rarity ?? '',
      setName: raw.setName ?? '',
      staticScore: raw.staticScore ?? '',
    };
  }
}
