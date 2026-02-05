import { compareCardsPreviewMock } from '../../../../common/mocks/compareCards.mock';
import { DataBaseCardsRepository } from '../DataBaseCardsRepository';
import { CompareCardsPreviewEntity } from '../entities/CompareCardsPreviewEntity';

export class DataBaseCardsMockRepository implements DataBaseCardsRepository {
  private compareCards: CompareCardsPreviewEntity[] = [
    ...compareCardsPreviewMock,
  ];

  async getCompareCards(): Promise<CompareCardsPreviewEntity[]> {
    await new Promise<void>(resolve => {
      setTimeout(resolve, 500);
    });
    return this.compareCards;
  }

  async deleteComparison(id: string): Promise<void> {
    this.compareCards = this.compareCards.filter(card => card.id !== id);
    return Promise.resolve();
  }

  async deleteComparisons(ids: string[]): Promise<void> {
    this.compareCards = this.compareCards.filter(
      card => !ids.includes(card.id),
    );
    return Promise.resolve();
  }
}
