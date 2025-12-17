export interface StoredCardRaw {
  id: string;
  name: string;
  type: string;
  hp: number;
  imageUrl?: string;
  setName: string;
  attacks?: {
    name: string;
    damage: number;
    cost: { type: string; name: string }[];
  }[];
  weaknesses?: { type: string; value: string; name: string }[];
  resistances?: { type: string; value: string; name: string }[];
}
