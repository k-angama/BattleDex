import { CardRaw } from '../../../../common/api/dto/CardRaw';
import {
  MatchResultRaw,
  PowerScoreCardResultRaw,
} from '../../../../common/api/dto/MatchResultRaw';
import { CardMapper } from '../../../home/data/mappers/CardMappter';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';
import { MatchResultEntity } from '../../domaine/entities/MatchResultEntity';

export class MatchResultMapper {
  static toEntity(dto: MatchResultRaw): MatchResultEntity {
    const [winnerCard, loserCard] = this.resolveWinnerLoser(dto);
    return {
      winner: dto.winner,
      winnerCard: this.mapCardRawResult(winnerCard),
      loserCard: this.mapCardRawResult(loserCard),
    };
  }

  private static resolveWinnerLoser(dto: MatchResultRaw) {
    if (dto.winner === 'card1') {
      return [dto.card1, dto.card2];
    }
    if (dto.winner === 'card2') {
      return [dto.card2, dto.card1];
    }

    return [dto.card1, dto.card2];
  }

  private static mapCardRawResult(
    raw: PowerScoreCardResultRaw,
  ): MatchResultEntity['winnerCard'] {
    return {
      powerScore: raw.powerScore ? raw.powerScore.toFixed(1) : '-',
      staticPowerScore: raw.staticPowerScore
        ? raw.staticPowerScore.toFixed(1)
        : '-',
      finalHp: (raw.finalHp ?? 0).toString(),
      damageDealtp: (raw.damageDealt ?? 0).toString(),
      detail: this.mapCardRaw(raw.card),
    };
  }

  private static mapCardRaw(raw: CardRaw): CardEntity {
    return CardMapper.toEntity(raw);
  }
}
