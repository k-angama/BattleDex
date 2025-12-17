import { suggestionToCard } from '../../../../common/mocks/detailCards.mock';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';
import { GetDetailCardRepository } from '../GetDetailCardRepository';

export class GetDetailCardMockRepository implements GetDetailCardRepository {
  async getCardById(cardId: string): Promise<CardEntity | null> {
    await new Promise<void>(async resolve => {
      await setTimeout(resolve, 500);
    });
    return suggestionToCard(cardId);
  }
}
