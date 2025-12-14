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
        powerScore: '88',
        finalHp: '92',
        staticPowerScore: '84',
        detail: cardOne,
        damageDealtp: '180',
      },
      loserCard: {
        powerScore: '76',
        finalHp: '70',
        staticPowerScore: '78',
        detail: cardTwo,
        damageDealtp: '18',
      },
    };
  }
}
