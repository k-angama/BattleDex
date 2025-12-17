import { CardRaw } from './CardRaw';

export type DuelWinner = 'card1' | 'card2' | 'draw' | 'none';
export type AttackerCard = 'card1' | 'card2';

export interface MatchResultRaw {
  winner: DuelWinner;
  card1: PowerScoreCardResultRaw;
  card2: PowerScoreCardResultRaw;
  log: TurnLogEntryRaw[];
}

export interface PowerScoreCardResultRaw {
  card: CardRaw;
  powerScore: number;
  finalHp: number;
  damageDealt: number;
  turnsPlayed: number;
  koTurn?: number | undefined;
  staticPowerScore: number;
}

export interface TurnLogEntryRaw {
  turn: number;
  attacker: AttackerCard;
  attackName: string | null;
  damage: number;
  defenderRemainingHp: number;
}
