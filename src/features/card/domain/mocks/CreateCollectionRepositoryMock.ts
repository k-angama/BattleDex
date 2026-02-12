import type { CollectionGroupEntity } from '../../../collection/domaine/entities/CollectionGroupEntity';
import type { CreateCollectionRepository } from '../repositories/CreateCollectionRepository';

let mockCollectionIdCounter = 100;

export class CreateCollectionRepositoryMock
  implements CreateCollectionRepository
{
  async createCollection(
    name: string,
    color: string,
  ): Promise<CollectionGroupEntity> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newCollection: CollectionGroupEntity = {
      id: `mock-collection-${mockCollectionIdCounter++}`,
      name,
      color,
      cardCount: 0,
    };

    return newCollection;
  }
}
