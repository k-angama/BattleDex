import { MatchResultEntity } from './entities/MatchResultEntity';

export interface DBSaveCardRepository {
  saveCardToDB(compartCard: MatchResultEntity): Promise<void>;
}
