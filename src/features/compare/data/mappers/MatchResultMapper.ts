import { CardRaw } from '../../../../common/api/dto/CardRaw';
import {
  MatchResultRaw,
  PowerScoreCardResultRaw,
} from '../../../../common/api/dto/MatchResultRaw';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';
import { MatchResultEntity } from '../../domaine/entities/MatchResultEntity';

export class MatchResultMapper {
  static toEntity(dto: MatchResultRaw): MatchResultEntity {
    const [winnerCard, loserCard] = this.resolveWinnerLoser(dto);
    return {
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
    console.log('Mapping card result: ', raw);
    return {
      powerScore: raw.powerScore ? raw.powerScore.toFixed(1) : '-',
      staticPowerScore: raw.staticPowerScore
        ? raw.staticPowerScore.toFixed(1)
        : '-',
      finalHp: raw.finalHp ? raw.finalHp.toString() : '-',
      damageDealtp: raw.damageDealt ? raw.damageDealt.toString() : '-',
      detail: this.mapCardRaw(raw.card),
    };
  }

  private static mapCardRaw(raw: CardRaw): CardEntity {
    return {
      id: raw.id ?? '-',
      name: raw.name ?? '-',
      type: raw.type ?? '-',
      hp: (raw.hp ?? 0) > 0 ? raw.hp?.toString() ?? '-' : '-',
      setName: raw.setName ?? '-',
      imageUrl: raw.imageUrl,
      attacks: (raw.attacks ?? []).map(attack => ({
        name: attack.name,
        damage: attack.damage,
        cost: attack.cost,
      })),
      weaknesses: (raw.weaknesses ?? []).map(weakness => ({
        type: weakness.type,
        name: weakness.type,
        value: weakness.value,
      })),
      resistances: (raw.resistances ?? []).map(resistance => ({
        type: resistance.type,
        name: resistance.type,
        value: resistance.value,
      })),
    };
  }
}
