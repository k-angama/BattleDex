import { DBSaveCardRepository } from '../DBSaveCardRepository';
import { MatchResultEntity } from '../entities/MatchResultEntity';

export class DBSaveCardMockRepository implements DBSaveCardRepository {
  async saveCardToDB(compartCard: MatchResultEntity): Promise<void> {
    // Simulate saving to a database with a delay
    return new Promise(resolve => {
      console.log('Saving card comparison to the database:', compartCard);
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}
