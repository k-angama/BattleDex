import type { SavedCardEntity } from '../entities/SavedCardEntity';
import type { AddToCollectionRepository } from '../repositories/AddToCollectionRepository';

const mockAddedCards: Map<string, Set<string>> = new Map();

export class AddToCollectionRepositoryMock
  implements AddToCollectionRepository
{
  async addCard(
    cardEntity: SavedCardEntity,
    collectionId: string,
  ): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!mockAddedCards.has(collectionId)) {
      mockAddedCards.set(collectionId, new Set());
    }

    mockAddedCards.get(collectionId)?.add(cardEntity.id);
  }

  async isCardInCollection(
    cardId: string,
    collectionId: string,
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAddedCards.get(collectionId)?.has(cardId) ?? false;
  }
}

export const addToCollectionRepositoryMock =
  new AddToCollectionRepositoryMock();
