export interface CardRaw {
  id?: string;
  name?: string;
  type?: string;
  hp?: number;
  imageUrl?: string;
  setName?: string;
  attacks?: {
    name: string;
    damage: number;
    energyCost: { type: string; name: string }[];
  }[];
  weaknesses?: { type: string; value: string }[];
  resistances?: { type: string; value: string }[];
  rarity?: string;
}
