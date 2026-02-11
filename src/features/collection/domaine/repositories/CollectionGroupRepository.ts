import type { CollectionGroupEntity } from '../entities/CollectionGroupEntity';

export interface CollectionGroupRepository {
  getCollections(): Promise<CollectionGroupEntity[]>;
  addCollection(name: string, color: string): Promise<CollectionGroupEntity>;
  updateCollection(collection: CollectionGroupEntity): Promise<void>;
  removeCollection(id: string): Promise<void>;
}
