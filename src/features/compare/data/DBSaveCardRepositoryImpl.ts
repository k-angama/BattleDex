import { CompareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
import { DBSaveCardRepository } from '../domaine/DBSaveCardRepository';
import { MatchResultEntity } from '../domaine/entities/MatchResultEntity';
import { StoredCardMapper } from './mappers/StoredCardMapper';

export class DBSaveCardRepositoryImpl implements DBSaveCardRepository {
  constructor(private compareLocalDatabase: CompareLocalDatabase) {}
  saveCardToDB(compartCard: MatchResultEntity): Promise<void> {
    const winnerJson = JSON.stringify(
      StoredCardMapper.fromEntity(compartCard.winnerCard.detail),
    );
    const loserJson = JSON.stringify(
      StoredCardMapper.fromEntity(compartCard.loserCard.detail),
    );
    return this.compareLocalDatabase.saveMatchResult(winnerJson, loserJson);
  }
}
