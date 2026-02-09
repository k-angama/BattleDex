import { CompareCardsPreviewEntity } from '../../home/domaine/entities/CompareCardsPreviewEntity';
import { MatchResultEntity } from './entities/MatchResultEntity';

export interface DBSaveCardRepository {
  saveCardToDB(
    compartCard: MatchResultEntity,
  ): Promise<CompareCardsPreviewEntity>;
}
