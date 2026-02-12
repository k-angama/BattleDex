import type { CardEntity } from '../../../home/domaine/entities/CardEntity';
import type { SavedCardEntity } from '../../domain/entities/SavedCardEntity';

export class SavedCardMapper {
  static toSavedCard(card: CardEntity): SavedCardEntity {
    return {
      id: card.id,
      title: card.name,
      staticScore: card.hp || 'N/A',
      imageUrl: card.imageUrl ?? '',
    };
  }
}
