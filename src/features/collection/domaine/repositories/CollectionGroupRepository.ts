import type { CollectionGroup } from '../entities/CollectionGroup';

export interface CollectionGroupRepository {
  getCollections(): Promise<CollectionGroup[]>;
  addCollection(collection: CollectionGroup): Promise<void>;
  removeCollection(id: string): Promise<void>;
}
