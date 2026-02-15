import { CollectionRowRaw } from '../../../../common/db/dto/CollectionRowRaw';
import { CreatedCollectionEntity } from '../../domain/entities/CreatedCollectionEntity';

export class CreateCollectionMapper {
  static toEntity(row: CollectionRowRaw): CreatedCollectionEntity {
    return {
      id: row.id,
      name: row.name,
      color: row.color,
      cardCount: row.card_count,
    };
  }
}
