import { CreatedCollectionEntity } from '../entities/CreatedCollectionEntity';
import type { CreateCollectionRepository } from '../repositories/CreateCollectionRepository';

let mockCollectionIdCounter = 100;

export class CreateCollectionRepositoryMock
  implements CreateCollectionRepository
{
  async createCollection(
    name: string,
    color: string,
  ): Promise<CreatedCollectionEntity> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newCollection: CreatedCollectionEntity = {
      id: `mock-collection-${mockCollectionIdCounter++}`,
      name,
      color,
      cardCount: 0,
    };

    return newCollection;
  }
}
