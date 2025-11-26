import { CardEntity } from '../../home/domaine/entities/CardEntity';

export interface GetDetailCardRepository {
  getCardById(cardId: string): Promise<CardEntity | null>;
}
