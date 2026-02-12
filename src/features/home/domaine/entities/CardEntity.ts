export interface CardEntity {
  id: string;
  name: string;
  type: string;
  hp: string;
  imageUrl?: string | undefined;
  attacks: CardAttackEntity[];
  weaknesses: CardWeaknessesEntity[];
  resistances: CardResistancesEntity[];
  metaUsageRate?: number;
  rarity?: string;
  setName: string;
  staticScore: string;
}

export interface CardAttackEntity {
  name: string;
  damage: number;
  cost: CardCostEntity[];
}

export interface CardCostEntity {
  type: string;
  name: string;
}

export interface CardResistancesEntity {
  type: string;
  name: string;
  value: string;
}

export interface CardWeaknessesEntity {
  type: string;
  name: string;
  value: string;
}
