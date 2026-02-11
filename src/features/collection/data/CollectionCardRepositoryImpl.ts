import { collectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import type { CollectionCardEntity } from '../domaine/entities/CollectionCardEntity';
import type { CollectionCardRepository } from '../domaine/repositories/CollectionCardRepository';

export class CollectionCardRepositoryImpl implements CollectionCardRepository {
  async getCardsByCollectionId(
    collectionId: string,
  ): Promise<CollectionCardEntity[]> {
    const rows = await collectionsLocalDatabase.getCardsForCollection(
      collectionId,
    );
    return rows.map(row => JSON.parse(row.card_json) as CollectionCardEntity);
  }

  async removeCard(cardId: string): Promise<void> {
    await collectionsLocalDatabase.removeCard(cardId);
  }
}
