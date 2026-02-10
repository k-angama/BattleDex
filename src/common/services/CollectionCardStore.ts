import { action, makeAutoObservable, observable } from 'mobx';
import type { CollectionCardEntity } from '../../features/collection/domaine/entities/CollectionCardEntity';

export class CollectionCardStore {
  cards: CollectionCardEntity[] = [];

  constructor() {
    makeAutoObservable(this, {
      cards: observable,
      setCards: action,
      addCard: action,
      removeCard: action,
      removeAllCards: action,
    });
  }

  setCards(cards: CollectionCardEntity[]) {
    this.cards = [...cards];
  }

  addCard(card: CollectionCardEntity) {
    this.cards = [card, ...this.cards];
  }

  removeCard(id: string) {
    this.cards = this.cards.filter(card => card.id !== id);
  }

  removeAllCards() {
    this.cards = [];
  }
}

export const collectionCardStore = new CollectionCardStore();
