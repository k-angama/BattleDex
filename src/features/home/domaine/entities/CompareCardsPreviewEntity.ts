import { CardEntity } from './CardEntity';

export interface CompareCardsPreviewEntity {
  id: string;
  loseCard: CardEntity;
  windCard: CardEntity;
  comparisonDate: Date;
}
