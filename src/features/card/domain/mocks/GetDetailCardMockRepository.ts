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
          damage: 30,
          cost: [
            { type: 'electric', name: 'Lightning' },
            { type: 'colorless', name: 'Colorless' },
          ],
        },
        {
          name: 'Electro Ball',
          damage: 50,
          cost: [
            { type: 'electric', name: 'Lightning' },
            { type: 'electric', name: 'Lightning' },
          ],
        },
      ],
      weaknesses: [
        {
          type: 'ground',
          name: 'Ground',
          value: '×2',
        },
      ],
      resistances: [
        {
          type: 'steel',
          name: 'Steel',
          value: '-20',
        },
      ],
      rarity: 'Common',
    };

    return mockCard;
  }
}
