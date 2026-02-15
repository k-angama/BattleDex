import { CollectionCardRowRaw } from '../../../../common/db/dto/CollectionCardRowRaw';
import { AddedCardEntity } from '../../domain/entities/AddedCardEntity';

export class AddedCardMapper {
  static toEntity(row: CollectionCardRowRaw): AddedCardEntity {
    const cardData = JSON.parse(row.card_json);
    return {
      id: cardData.id,
      title: cardData.title,
      staticScore: cardData.staticScore,
      imageUrl: cardData.imageUrl,
    };
  }
}
