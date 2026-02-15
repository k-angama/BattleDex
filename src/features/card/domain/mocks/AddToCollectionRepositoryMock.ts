import type { CardEntity } from '../../../home/domaine/entities/CardEntity';
import { SavedCardMapper } from '../../data/mappers/SavedCardMapper';
import type { AddedCardEntity } from '../entities/AddedCardEntity';
import type { AddToCollectionRepository } from '../repositories/AddToCollectionRepository';

const mockAddedCards: Map<string, Set<string>> = new Map();

export class AddToCollectionRepositoryMock
  implements AddToCollectionRepository
{
  async addCard(
    cardEntity: CardEntity,
    collectionId: string,
  ): Promise<AddedCardEntity> {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!mockAddedCards.has(collectionId)) {
      mockAddedCards.set(collectionId, new Set());
    }

    const card = SavedCardMapper.toSavedCard(cardEntity);

    mockAddedCards.get(collectionId)?.add(card.id);
    return {
      id: cardEntity.id,
      title: card.title,
      staticScore: cardEntity.staticScore,
      imageUrl: card.imageUrl,
    };
  }

  async isCardInCollection(
    cardId: string,
    collectionId: string,
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAddedCards.get(collectionId)?.has(cardId) ?? false;
  }
}
