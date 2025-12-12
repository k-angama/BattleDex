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

  static fromEntity(entity: MatchResultEntity): RawMatchResult {
    return {
      winnerCard: this.mapEntityResult(entity.winnerCard),
      loserCard: this.mapEntityResult(entity.loserCard),
      winnerCardId: entity.winnerCard.detail.id,
    };
  }

  private static mapRawCardResult(
    raw: RawCardResult,
  ): MatchResultEntity['winnerCard'] {
    return {
      score: raw.score,
      offensivePower: raw.offensivePower,
      defensivePower: raw.defensivePower,
      detail: this.mapRawCard(raw.detail),
    };
  }

  private static mapEntityResult(
    result: MatchResultEntity['winnerCard'],
  ): RawCardResult {
    return {
      score: result.score,
      offensivePower: result.offensivePower,
      defensivePower: result.defensivePower,
      detail: this.mapCardEntity(result.detail),
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

  private static mapCardEntity(card: CardEntity): RawCard {
    return {
      id: card.id,
      name: card.name,
      type: card.type,
      hp: card.hp,
      imageUrl: card.imageUrl,
      attacks: card.attacks,
      weaknesses: card.weaknesses,
      resistances: card.resistances,
    };
  }
}
