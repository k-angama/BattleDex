import { CompareCardsPreviewEntity } from './entities/CompareCardsPreviewEntity';

export interface DataBaseCardsRepository {
  getCompareCards(): Promise<CompareCardsPreviewEntity[]>;
  deleteComparison(id: string): Promise<void>;
  deleteComparisons(ids: string[]): Promise<void>;
  clearAllComparisons(): Promise<void>;
}
