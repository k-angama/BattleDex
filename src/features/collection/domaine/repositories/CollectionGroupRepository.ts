import type { CollectionGroupEntity } from '../entities/CollectionGroupEntity';

export interface CollectionGroupRepository {
  getCollections(): Promise<CollectionGroupEntity[]>;
  addCollection(collection: CollectionGroupEntity): Promise<void>;
  updateCollection(collection: CollectionGroupEntity): Promise<void>;
  removeCollection(id: string): Promise<void>;
}
