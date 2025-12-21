import { CompareRowRaw } from '../../../../common/db/dto/CompareRowRaw';
import { DuelWinnerEntity } from '../../../compare/domaine/entities/MatchResultEntity';
import { CompareCardsPreviewEntity } from '../../domaine/entities/CompareCardsPreviewEntity';
import { CardMapper } from './CardMappter';

export class ComparePreviewMapper {
  static toEntity(row: CompareRowRaw): CompareCardsPreviewEntity {
    const winner = CardMapper.toEntity(JSON.parse(row.winner_json));
    const loser = CardMapper.toEntity(JSON.parse(row.loser_json));

    return {
      id: row.id,
      winner: (row.winner ?? 'none') as DuelWinnerEntity,
      windCard: winner,
      loseCard: loser,
      comparisonDate: new Date(row.comparison_date),
    };
  }
}
