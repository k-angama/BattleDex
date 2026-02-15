import { CollectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import type { CollectionCardEntity } from '../domaine/entities/CollectionCardEntity';
import type { CollectionCardRepository } from '../domaine/repositories/CollectionCardRepository';

export class CollectionCardRepositoryImpl implements CollectionCardRepository {
  constructor(private collectionsLocalDatabase: CollectionsLocalDatabase) {}

  async getCardsByCollectionId(
    collectionId: string,
  ): Promise<CollectionCardEntity[]> {
    const rows = await this.collectionsLocalDatabase.getCardsForCollection(
      collectionId,
    );
    return rows.map(row => JSON.parse(row.card_json) as CollectionCardEntity);
  }

  async removeCard(cardId: string): Promise<void> {
    await this.collectionsLocalDatabase.removeCard(cardId);
  }
}
