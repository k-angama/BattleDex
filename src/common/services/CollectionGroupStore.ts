import { action, makeAutoObservable, observable } from 'mobx';
import { CollectionGroupEntity } from '../../features/collection/domaine/entities/CollectionGroupEntity';

export class CollectionGroupStore {
  collections: CollectionGroupEntity[] = [];

  constructor() {
    makeAutoObservable(this, {
      collections: observable,
      setCollections: action,
      addCollection: action,
      updateCollection: action,
      removeCollection: action,
      removeAllCollections: action,
    });
  }

  setCollections(collections: CollectionGroupEntity[]) {
    this.collections = [...collections];
  }

  addCollection(collection: CollectionGroupEntity) {
    this.collections = [collection, ...this.collections];
  }

  updateCollection(collection: CollectionGroupEntity) {
    this.collections = this.collections.map(c =>
      c.id === collection.id ? collection : c,
    );
  }

  findCollectionById(id: string): CollectionGroupEntity | undefined {
    return this.collections.find(collection => collection.id === id);
  }

  removeCollection(id: string) {
    this.collections = this.collections.filter(
      collection => collection.id !== id,
    );
  }

  addCardCountToCollection(id: string, count: number) {
    this.collections = this.collections.map(collection => {
      if (collection.id === id) {
        return { ...collection, cardCount: collection.cardCount + count };
      }
      return collection;
    });
  }

  removeCardCountFromCollection(id: string, count: number) {
    this.collections = this.collections.map(collection => {
      if (collection.id === id) {
        return {
          ...collection,
          cardCount: Math.max(0, collection.cardCount - count),
        };
      }
      return collection;
    });
  }

  removeAllCollections() {
    this.collections = [];
  }
}

export const collectionGroupStore = new CollectionGroupStore();
