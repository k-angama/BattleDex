import type { CollectionCardEntity } from '../entities/CollectionCardEntity';

export interface CollectionCardRepository {
  getCardsByCollectionId(collectionId: string): Promise<CollectionCardEntity[]>;
  removeCard(cardId: string): Promise<void>;
}
