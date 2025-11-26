import { CardEntity } from '../../../home/domaine/entities/CardEntity';

export interface MatchResultEntity {
  winnerCard: CardResultEntity;
  loserCard: CardResultEntity;
}

interface CardResultEntity {
  score: number;
  offensivePower: number;
  defensivePower: number;
  detail: CardEntity;
}
