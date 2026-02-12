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
    // Parse staticScore to number for comparison (supporting decimal values)
    const newScore = parseFloat(card.staticScore) || 0;

    // Find the correct position (descending order - highest score first)
    const insertIndex = this.cards.findIndex(existingCard => {
      const existingScore = parseFloat(existingCard.staticScore) || 0;
      return newScore > existingScore;
    });

    // If no position found (card is weakest or list is empty), add at end
    if (insertIndex === -1) {
      this.cards = [...this.cards, card];
    } else {
      // Insert at the correct position to maintain sort order
      this.cards = [
        ...this.cards.slice(0, insertIndex),
        card,
        ...this.cards.slice(insertIndex),
      ];
    }
  }

  removeCard(id: string) {
    this.cards = this.cards.filter(card => card.id !== id);
  }

  removeAllCards() {
    this.cards = [];
  }
}

export const collectionCardStore = new CollectionCardStore();
