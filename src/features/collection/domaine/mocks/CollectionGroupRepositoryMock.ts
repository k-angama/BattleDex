import { collectionGroupMockData } from '../../../../common/mocks/collectionGroupMock';
import type { CollectionGroup } from '../entities/CollectionGroup';
import type { CollectionGroupRepository } from '../repositories/CollectionGroupRepository';

export class CollectionGroupRepositoryMock
  implements CollectionGroupRepository
{
  private collections: CollectionGroup[] = [...collectionGroupMockData];

  async getCollections(): Promise<CollectionGroup[]> {
    // Simulate async operation
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...this.collections]);
      }, 300);
    });
  }

  async addCollection(collection: CollectionGroup): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.collections.push(collection);
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
