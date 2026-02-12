import type { CollectionGroupEntity } from '../../../collection/domaine/entities/CollectionGroupEntity';

export interface CreateCollectionRepository {
  createCollection(name: string, color: string): Promise<CollectionGroupEntity>;
}
