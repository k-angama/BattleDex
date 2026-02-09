import type { CollectionGroup } from '../domaine/entities/CollectionGroup';
import type { CollectionGroupRepository } from '../domaine/repositories/CollectionGroupRepository';

export class CollectionGroupRepositoryImpl
  implements CollectionGroupRepository
{
  async getCollections(): Promise<CollectionGroup[]> {
    throw new Error('Method not implemented.');
  }

  async addCollection(_collection: CollectionGroup): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async removeCollection(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
