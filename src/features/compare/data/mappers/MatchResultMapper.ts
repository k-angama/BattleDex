import {
  RawCard,
  RawCardResult,
  RawMatchResult,
} from '../../../../common/api/types';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';
import { MatchResultEntity } from '../../domaine/entities/MatchResultEntity';

export class MatchResultMapper {
  static toEntity(dto: RawMatchResult): MatchResultEntity {
    return {
      winnerCard: this.mapRawCardResult(dto.winnerCard),
      loserCard: this.mapRawCardResult(dto.loserCard),
    };
  }

  private static mapRawCardResult(
    raw: RawCardResult,
  ): MatchResultEntity['winnerCard'] {
    return {
      powerScore: raw.score.toFixed(1),
      staticPowerScore: '0',
      finalHp: '0',
      damageDealtp: '0',
      detail: this.mapRawCard(raw.detail),
    };
  }

  private static mapRawCard(raw: RawCard): CardEntity {
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
}
