import { CollectionCardRowRaw } from '../../../../common/db/dto/CollectionCardRowRaw';
import type { CollectionCardEntity } from '../../domaine/entities/CollectionCardEntity';

export class CollectionCardMapper {
  static toEntity(dto: CollectionCardRowRaw): CollectionCardEntity {
    const cardData = JSON.parse(dto.card_json);
    return {
      id: cardData.id,
      title: cardData.title,
      staticScore: cardData.staticScore,
      imageUrl: cardData.imageUrl,
    };
  }
}
