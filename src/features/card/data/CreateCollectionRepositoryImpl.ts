import { CollectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import { CollectionGroupMapper } from '../../collection/data/mappers/CollectionGroupMapper';
import type { CollectionGroupEntity } from '../../collection/domaine/entities/CollectionGroupEntity';
import type { CreateCollectionRepository } from '../domain/repositories/CreateCollectionRepository';

export class CreateCollectionRepositoryImpl
  implements CreateCollectionRepository
{
  constructor(private collectionsLocalDatabase: CollectionsLocalDatabase) {}

  async createCollection(
    name: string,
    color: string,
  ): Promise<CollectionGroupEntity> {
    const savedRow = await this.collectionsLocalDatabase.saveCollection(
      name,
      color,
    );
    return CollectionGroupMapper.toEntity(savedRow);
  }
}
