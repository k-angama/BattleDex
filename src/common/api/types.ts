export interface RawCard {
  id: string;
  name: string;
  type: string;
  hp: number;
  imageUrl?: string;
  attacks?: { name: string; damage: number; energyCost: number }[];
  weaknesses?: { type: string; value: string }[];
  resistances?: { type: string; value: string }[];
  rarity?: string;
}

export interface RawSearchCard {
  id: string;
  name: string;
  setName: string;
  imageUrl?: string;
}

export interface RawMatchResult {
  winnerCard: RawCardResult;
  loserCard: RawCardResult;
  winnerCardId: string;
}

export interface RawCardResult {
  score: number;
  offensivePower: number;
  defensivePower: number;
  detail: RawCard;
}
