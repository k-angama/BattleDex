import { CompareRowRaw } from '../../../../common/db/dto/CompareRowRaw';
import { StoredCardMapper } from '../../../compare/data/mappers/StoredCardMapper';
import { CompareCardsPreviewEntity } from '../../domaine/entities/CompareCardsPreviewEntity';

export class ComparePreviewMapper {
  static toEntity(row: CompareRowRaw): CompareCardsPreviewEntity {
    const winner = StoredCardMapper.toEntity(JSON.parse(row.winner_json));
    const loser = StoredCardMapper.toEntity(JSON.parse(row.loser_json));

    return {
      id: row.id,
      windCard: winner,
      loseCard: loser,
      comparisonDate: new Date(row.comparison_date),
    };
  }
}
