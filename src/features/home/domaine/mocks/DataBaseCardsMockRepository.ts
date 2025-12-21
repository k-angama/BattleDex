import { compareCardsPreviewMock } from '../../../../common/mocks/compareCards.mock';
import { DataBaseCardsRepository } from '../DataBaseCardsRepository';
import { CompareCardsPreviewEntity } from '../entities/CompareCardsPreviewEntity';

export class DataBaseCardsMockRepository implements DataBaseCardsRepository {
  async getCompareCards(): Promise<CompareCardsPreviewEntity[]> {
    await new Promise<void>(async resolve => {
      await setTimeout(resolve, 500);
    });
    return compareCardsPreviewMock;
  }
}
