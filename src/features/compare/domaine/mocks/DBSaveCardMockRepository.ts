import { compareCardsPreviewMock } from '../../../../common/mocks/compareCards.mock';
import { CompareCardsPreviewEntity } from '../../../home/domaine/entities/CompareCardsPreviewEntity';
import { DBSaveCardRepository } from '../DBSaveCardRepository';
import { MatchResultEntity } from '../entities/MatchResultEntity';

export class DBSaveCardMockRepository implements DBSaveCardRepository {
  async saveCardToDB(
    compartCard: MatchResultEntity,
  ): Promise<CompareCardsPreviewEntity> {
    // Simulate saving to a database with a delay
    return new Promise(resolve => {
      console.log('Saving card comparison to the database:', compartCard);
      setTimeout(() => {
        resolve(compareCardsPreviewMock[0]); // Return a mock CompareCardsPreviewEntity after a delay
      }, 500);
    });
  }
}
