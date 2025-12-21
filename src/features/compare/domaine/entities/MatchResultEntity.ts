import { CardEntity } from '../../../home/domaine/entities/CardEntity';

export type DuelWinnerEntity = 'card1' | 'card2' | 'draw' | 'none';

export interface MatchResultEntity {
  winner: DuelWinnerEntity;
  winnerCard: CardResultEntity;
  loserCard: CardResultEntity;
}

interface CardResultEntity {
  powerScore: string;
  staticPowerScore: string;
  finalHp: string;
  damageDealtp: string;
  detail: CardEntity;
}
