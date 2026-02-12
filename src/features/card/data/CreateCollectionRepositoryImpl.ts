import { CollectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import { CreatedCollectionEntity } from '../domain/entities/CreatedCollectionEntity';
import type { CreateCollectionRepository } from '../domain/repositories/CreateCollectionRepository';
import { CreateCollectionMapper } from './mappers/CreateCollectionMapper';

export class CreateCollectionRepositoryImpl
  implements CreateCollectionRepository
{
  constructor(private collectionsLocalDatabase: CollectionsLocalDatabase) {}

  async createCollection(
    name: string,
    color: string,
  ): Promise<CreatedCollectionEntity> {
    const savedRow = await this.collectionsLocalDatabase.saveCollection(
      name,
      color,
    );
    return CreateCollectionMapper.toEntity(savedRow);
  }
}
