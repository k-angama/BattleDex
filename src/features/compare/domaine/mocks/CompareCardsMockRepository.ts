import { delay } from '../../../../common/utils/time';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';
import { CompareCardRepository } from '../CompareCardRepository';
import { MatchResultEntity } from '../entities/MatchResultEntity';

export class CompareCardsMockRepository implements CompareCardRepository {
  async compareCards(
    cardOne: CardEntity,
    cardTwo: CardEntity,
  ): Promise<MatchResultEntity> {
    await delay(1000); // Simulate network delay
    return {
      winnerCard: {
        score: 88,
        offensivePower: 92,
        defensivePower: 84,
        detail: cardOne,
      },
      loserCard: {
        score: 76,
        offensivePower: 70,
        defensivePower: 78,
        detail: cardTwo,
      },
    };
  }
}
