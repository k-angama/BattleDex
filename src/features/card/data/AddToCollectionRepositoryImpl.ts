import { CollectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import { CollectionCardMapper } from '../../collection/data/mappers/CollectionCardMapper';
import { CollectionCardEntity } from '../../collection/domaine/entities/CollectionCardEntity';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import type { AddToCollectionRepository } from '../domain/repositories/AddToCollectionRepository';
import { SavedCardMapper } from './mappers/SavedCardMapper';

export class AddToCollectionRepositoryImpl
  implements AddToCollectionRepository
{
  constructor(private collectionsLocalDatabase: CollectionsLocalDatabase) {}

  async addCard(
    cardEntity: CardEntity,
    collectionId: string,
  ): Promise<CollectionCardEntity> {
    const savedCardEntity = SavedCardMapper.toSavedCard(cardEntity);
    const cardJson = JSON.stringify(savedCardEntity);
    const savedRow = await this.collectionsLocalDatabase.addCard(
      collectionId,
      cardJson,
    );
    return CollectionCardMapper.toEntity(savedRow);
  }

  async isCardInCollection(
    cardId: string,
    collectionId: string,
  ): Promise<boolean> {
    return await this.collectionsLocalDatabase.isCardInCollection(
      cardId,
      collectionId,
    );
  }
}
