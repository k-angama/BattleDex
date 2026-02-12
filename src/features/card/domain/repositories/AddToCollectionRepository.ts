import { CollectionCardEntity } from '../../../collection/domaine/entities/CollectionCardEntity';
import { CardEntity } from '../../../home/domaine/entities/CardEntity';

export interface AddToCollectionRepository {
  addCard(
    cardEntity: CardEntity,
    collectionId: string,
  ): Promise<CollectionCardEntity>;
  isCardInCollection(cardId: string, collectionId: string): Promise<boolean>;
}
