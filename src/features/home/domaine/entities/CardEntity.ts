export interface CardEntity {
  id: string;
  name: string;
  type: string;
  hp: number;
  imageUrl?: string | undefined;
  attacks: CardAttackEntity[];
  weaknesses: CardWeaknessesEntity[];
  resistances: CardResistancesEntity[];
  metaUsageRate?: number;
  rarity?: string;
}

export interface CardAttackEntity {
  name: string;
  damage: number;
  energyCost: number;
}

export interface CardResistancesEntity {
  type: string;
  value: string;
}

export interface CardWeaknessesEntity {
  type: string;
  value: string;
}
