import { RawCompareRow, RawStoredCard } from '../../../../common/db/types';
import { StoredCardMapper } from '../../../compare/data/mappers/StoredCardMapper';
import { CompareCardsPreviewEntity } from '../../domaine/entities/CompareCardsPreviewEntity';

export class ComparePreviewMapper {
  static toEntity(row: RawCompareRow): CompareCardsPreviewEntity {
    const winner = StoredCardMapper.toEntity(
      JSON.parse(row.winner_json) as RawStoredCard,
    );
    const loser = StoredCardMapper.toEntity(
      JSON.parse(row.loser_json) as RawStoredCard,
    );

    return {
      id: row.id,
      windCard: winner,
      loseCard: loser,
      comparisonDate: new Date(row.comparison_date),
    };
  }

  static fromEntity(entity: CompareCardsPreviewEntity): RawCompareRow {
    return {
      id: entity.id,
      winner_json: JSON.stringify(StoredCardMapper.fromEntity(entity.windCard)),
      loser_json: JSON.stringify(StoredCardMapper.fromEntity(entity.loseCard)),
      comparison_date: entity.comparisonDate.getTime(),
    };
  }
}
