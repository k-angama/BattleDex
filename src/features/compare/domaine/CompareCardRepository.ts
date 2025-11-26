import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { MatchResultEntity } from './entities/MatchResultEntity';

export interface CompareCardRepository {
  compareCards(
    cardOne: CardEntity,
    cardTwo: CardEntity,
  ): Promise<MatchResultEntity>;
}
