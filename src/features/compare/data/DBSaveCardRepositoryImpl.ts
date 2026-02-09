import { CompareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
import { CardMapper } from '../../home/data/mappers/CardMappter';
import { ComparePreviewMapper } from '../../home/data/mappers/ComparePreviewMapper';
import { CompareCardsPreviewEntity } from '../../home/domaine/entities/CompareCardsPreviewEntity';
import { DBSaveCardRepository } from '../domaine/DBSaveCardRepository';
import { MatchResultEntity } from '../domaine/entities/MatchResultEntity';

export class DBSaveCardRepositoryImpl implements DBSaveCardRepository {
  constructor(private compareLocalDatabase: CompareLocalDatabase) {}
  saveCardToDB(
    compartCard: MatchResultEntity,
  ): Promise<CompareCardsPreviewEntity> {
    const winnerJson = JSON.stringify(
      CardMapper.fromEntity(compartCard.winnerCard.detail),
    );
    const loserJson = JSON.stringify(
      CardMapper.fromEntity(compartCard.loserCard.detail),
    );
    return this.compareLocalDatabase
      .saveMatchResult(winnerJson, loserJson, compartCard.winner)
      .then(row => ComparePreviewMapper.toEntity(row));
  }
}
