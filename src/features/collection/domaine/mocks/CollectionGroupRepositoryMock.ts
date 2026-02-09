import { collectionGroupMockData } from '../../../../common/mocks/collectionGroupMock';
import type { CollectionGroupEntity } from '../entities/CollectionGroupEntity';
import type { CollectionGroupRepository } from '../repositories/CollectionGroupRepository';

export class CollectionGroupRepositoryMock
  implements CollectionGroupRepository
{
  private collections: CollectionGroupEntity[] = [...collectionGroupMockData];

  async getCollections(): Promise<CollectionGroupEntity[]> {
    // Simulate async operation
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...this.collections]);
      }, 300);
    });
  }

  async addCollection(collection: CollectionGroupEntity): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.collections = [collection, ...this.collections];
        resolve();
      }, 300);
    });
  }

  async removeCollection(id: string): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.collections = this.collections.filter(c => c.id !== id);
        resolve();
      }, 300);
    });
  }
}
