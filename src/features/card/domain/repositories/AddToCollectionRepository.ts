import type { SavedCardEntity } from '../entities/SavedCardEntity';

export interface AddToCollectionRepository {
  addCard(cardEntity: SavedCardEntity, collectionId: string): Promise<void>;
  isCardInCollection(cardId: string, collectionId: string): Promise<boolean>;
}
