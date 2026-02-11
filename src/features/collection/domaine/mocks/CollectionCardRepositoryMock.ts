import { collectionCardMockData } from '../../../../common/mocks/collectionCardMock';
import type { CollectionCardEntity } from '../entities/CollectionCardEntity';
import { CollectionCardRepository } from '../repositories/CollectionCardRepository';

const mockCards: CollectionCardEntity[] = [...collectionCardMockData];

export class CollectionCardRepositoryMock implements CollectionCardRepository {
  async getCardsByCollectionId(
    _collectionId: string,
  ): Promise<CollectionCardEntity[]> {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockCards];
  }

  async addCard(
    cardEntity: CollectionCardEntity,
    _collectionId: string,
  ): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Check if card already exists
    const exists = mockCards.some(card => card.id === cardEntity.id);
    if (!exists) {
      mockCards.push(cardEntity);
    }
  }

  async removeCard(cardId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockCards.findIndex(card => card.id === cardId);
    if (index > -1) {
      mockCards.splice(index, 1);
    }
  }

  async isCardInCollection(
    cardId: string,
    _collectionId: string,
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCards.some(card => card.id === cardId);
  }
}

export const collectionCardRepositoryMock = new CollectionCardRepositoryMock();
