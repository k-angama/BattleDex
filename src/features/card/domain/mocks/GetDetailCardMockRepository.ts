import { CardEntity } from '../../../home/domaine/entities/CardEntity';
import { GetDetailCardRepository } from '../GetDetailCardRepository';

export class GetDetailCardMockRepository implements GetDetailCardRepository {
  async getCardById(cardId: string): Promise<CardEntity | null> {
    await new Promise<void>(async resolve => {
      await setTimeout(resolve, 500);
    });
    const mockCard: CardEntity = {
      id: cardId,
      name: 'Pikachu',
      imageUrl: 'https://images.pokemontcg.io/base1/58_hires.png',
      hp: 60,
      type: 'Electric',
      attacks: [
        {
          name: 'Thunder Shock',
          energyCost: 10,
          damage: 30,
        },
      ],
      weaknesses: [
        {
          type: 'Ground',
          value: '×2',
        },
      ],
      resistances: [
        {
          type: 'Steel',
          value: '-20',
        },
      ],
      rarity: 'Rarity',
    };

    return mockCard;
  }
}
