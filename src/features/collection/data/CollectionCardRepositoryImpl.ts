import type { CollectionCardEntity } from '../domaine/entities/CollectionCardEntity';
import type { CollectionCardRepository } from '../domaine/repositories/CollectionCardRepository';

export class CollectionCardRepositoryImpl implements CollectionCardRepository {
  async getCardsByCollectionId(
    _collectionId: string,
  ): Promise<CollectionCardEntity[]> {
    throw new Error('Method not implemented.');
  }

  async addCard(
    _collectionId: string,
    _card: CollectionCardEntity,
  ): Promise<CollectionCardEntity> {
    throw new Error('Method not implemented.');
  }

  async removeCard(_cardId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
