import { CardEntity } from '../../../home/domaine/entities/CardEntity';

export interface MatchResultEntity {
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
