import type { CollectionCardEntity } from '../entities/CollectionCardEntity';

export interface CollectionCardRepository {
  getCardsByCollectionId(collectionId: string): Promise<CollectionCardEntity[]>;
  addCard(
    cardEntity: CollectionCardEntity,
    collectionId: string,
  ): Promise<void>;
  removeCard(cardId: string): Promise<void>;
  isCardInCollection(cardId: string, collectionId: string): Promise<boolean>;
}
