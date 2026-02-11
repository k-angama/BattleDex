import { collectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import type { SavedCardEntity } from '../domain/entities/SavedCardEntity';
import type { AddToCollectionRepository } from '../domain/repositories/AddToCollectionRepository';

export class AddToCollectionRepositoryImpl
  implements AddToCollectionRepository
{
  async addCard(
    cardEntity: SavedCardEntity,
    collectionId: string,
  ): Promise<void> {
    const cardJson = JSON.stringify(cardEntity);
    await collectionsLocalDatabase.addCard(collectionId, cardJson);
  }

  async isCardInCollection(
    cardId: string,
    collectionId: string,
  ): Promise<boolean> {
    return await collectionsLocalDatabase.isCardInCollection(
      cardId,
      collectionId,
    );
  }
}
