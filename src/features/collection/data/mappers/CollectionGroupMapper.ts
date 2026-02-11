import { CollectionRowRaw } from '../../../../common/db/dto/CollectionRowRaw';
import type { CollectionGroupEntity } from '../../domaine/entities/CollectionGroupEntity';

export class CollectionGroupMapper {
  static toEntity(row: CollectionRowRaw): CollectionGroupEntity {
    return {
      id: row.id,
      name: row.name,
      color: row.color,
      cardCount: row.card_count,
    };
  }

  static toPersistence(entity: CollectionGroupEntity): {
    name: string;
    color: string;
  } {
    return {
      name: entity.name,
      color: entity.color,
    };
  }
}
