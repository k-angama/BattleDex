import type { CollectionCardEntity } from '../../domaine/entities/CollectionCardEntity';

export interface CollectionCardDTO {
  id: string;
  title: string;
  staticScore: string;
  imageUrl: string;
}

export class CollectionCardMapper {
  static toEntity(dto: CollectionCardDTO): CollectionCardEntity {
    return {
      id: dto.id,
      title: dto.title,
      staticScore: dto.staticScore,
      imageUrl: dto.imageUrl,
    };
  }

  static toPersistence(entity: CollectionCardEntity): CollectionCardDTO {
    return {
      id: entity.id,
      title: entity.title,
      staticScore: entity.staticScore,
      imageUrl: entity.imageUrl,
    };
  }
}
