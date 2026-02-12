import { CollectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import type { CardEntity } from '../../home/domaine/entities/CardEntity';
import type { AddedCardEntity } from '../domain/entities/AddedCardEntity';
import type { AddToCollectionRepository } from '../domain/repositories/AddToCollectionRepository';
import { AddedCardMapper } from './mappers/AddedCardMapper';
import { SavedCardMapper } from './mappers/SavedCardMapper';

export class AddToCollectionRepositoryImpl
  implements AddToCollectionRepository
{
  constructor(private collectionsLocalDatabase: CollectionsLocalDatabase) {}

  async addCard(
    cardEntity: CardEntity,
    collectionId: string,
  ): Promise<AddedCardEntity> {
    const savedCardEntity = SavedCardMapper.toSavedCard(cardEntity);
    const cardJson = JSON.stringify(savedCardEntity);
    const savedRow = await this.collectionsLocalDatabase.addCard(
      collectionId,
      cardJson,
    );
    return AddedCardMapper.toEntity(savedRow);
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
