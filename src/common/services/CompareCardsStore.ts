import { action, makeAutoObservable, observable } from 'mobx';
import { CompareCardsPreviewEntity } from '../../features/home/domaine/entities/CompareCardsPreviewEntity';

export class CompareCardsStore {
  compareCards: CompareCardsPreviewEntity[] = [];

  constructor() {
    makeAutoObservable(this, {
      compareCards: observable,
      addCards: action,
      addCard: action,
    });
  }

  addCards(card: CompareCardsPreviewEntity[]) {
    this.compareCards = [...card];
  }
  addCard(card: CompareCardsPreviewEntity) {
    this.compareCards = [card, ...this.compareCards];
  }
  removeCards(ids: string[]) {
    this.compareCards = this.compareCards.filter(
      card => !ids.includes(card.id),
    );
  }
  removeCard(id: string) {
    this.compareCards = this.compareCards.filter(card => card.id !== id);
  }
}

export const compareCardsStore = new CompareCardsStore();
