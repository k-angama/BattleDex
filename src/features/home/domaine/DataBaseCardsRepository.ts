import { CompareCardsPreviewEntity } from './entities/CompareCardsPreviewEntity';

export interface DataBaseCardsRepository {
  getCompareCards(): Promise<CompareCardsPreviewEntity[]>;
}
