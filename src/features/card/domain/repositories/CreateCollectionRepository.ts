import { CreatedCollectionEntity } from '../entities/CreatedCollectionEntity';

export interface CreateCollectionRepository {
  createCollection(
    name: string,
    color: string,
  ): Promise<CreatedCollectionEntity>;
}
