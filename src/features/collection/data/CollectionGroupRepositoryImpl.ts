import type { CollectionGroupEntity } from '../domaine/entities/CollectionGroupEntity';
import { CollectionGroupRepository } from '../domaine/repositories/CollectionGroupRepository';

export class CollectionGroupRepositoryImpl
  implements CollectionGroupRepository
{
  async getCollections(): Promise<CollectionGroupEntity[]> {
    throw new Error('Method not implemented.');
  }

  async addCollection(_collection: CollectionGroupEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateCollection(_collection: CollectionGroupEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async removeCollection(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
