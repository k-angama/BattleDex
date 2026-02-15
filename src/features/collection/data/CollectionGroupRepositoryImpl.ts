import { CollectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import type { CollectionGroupEntity } from '../domaine/entities/CollectionGroupEntity';
import { CollectionGroupRepository } from '../domaine/repositories/CollectionGroupRepository';
import { CollectionGroupMapper } from './mappers/CollectionGroupMapper';

export class CollectionGroupRepositoryImpl
  implements CollectionGroupRepository
{
  constructor(private collectionsLocalDatabase: CollectionsLocalDatabase) {}

  async getCollections(): Promise<CollectionGroupEntity[]> {
    const rows = await this.collectionsLocalDatabase.getCollections();
    return rows.map(row => CollectionGroupMapper.toEntity(row));
  }

  async addCollection(
    name: string,
    color: string,
  ): Promise<CollectionGroupEntity> {
    const savedRow = await this.collectionsLocalDatabase.saveCollection(
      name,
      color,
    );
    return CollectionGroupMapper.toEntity(savedRow);
  }

  async updateCollection(collection: CollectionGroupEntity): Promise<void> {
    const data = CollectionGroupMapper.toPersistence(collection);
    await this.collectionsLocalDatabase.updateCollection(
      collection.id,
      data.name,
      data.color,
    );
  }

  async removeCollection(id: string): Promise<void> {
    await this.collectionsLocalDatabase.deleteCollection(id);
  }
}
