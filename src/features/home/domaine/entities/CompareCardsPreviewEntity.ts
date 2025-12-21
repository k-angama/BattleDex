import { DuelWinnerEntity } from '../../../compare/domaine/entities/MatchResultEntity';
import { CardEntity } from './CardEntity';

export interface CompareCardsPreviewEntity {
  id: string;
  winner: DuelWinnerEntity;
  loseCard: CardEntity;
  windCard: CardEntity;
  comparisonDate: Date;
}
