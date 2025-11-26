export interface RawCompareRow {
  id: string;
  winner_json: string;
  loser_json: string;
  comparison_date: number; // epoch ms
}

export interface RawStoredCard {
  id: string;
  name: string;
  type: string;
  hp: number;
  imageUrl?: string;
  attacks?: { name: string; damage: number; energyCost: number }[];
  weaknesses?: { type: string; value: string }[];
  resistances?: { type: string; value: string }[];
}
