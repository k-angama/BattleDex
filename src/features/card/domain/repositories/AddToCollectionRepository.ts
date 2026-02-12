import type { AddedCardEntity } from '../entities/AddedCardEntity';
import type { CardEntity } from '../../../home/domaine/entities/CardEntity';

export interface AddToCollectionRepository {
  addCard(
    cardEntity: CardEntity,
    collectionId: string,
  ): Promise<AddedCardEntity>;
  isCardInCollection(cardId: string, collectionId: string): Promise<boolean>;
}
