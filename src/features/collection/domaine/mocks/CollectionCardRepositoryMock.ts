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
    _collectionId: string,
    card: CollectionCardEntity,
  ): Promise<CollectionCardEntity> {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockCards.push(card);
    return card;
  }

  async removeCard(cardId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockCards.findIndex(card => card.id === cardId);
    if (index > -1) {
      mockCards.splice(index, 1);
    }
  }
}

export const collectionCardRepositoryMock = new CollectionCardRepositoryMock();
