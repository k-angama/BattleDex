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

  removeCollection(id: string) {
    this.collections = this.collections.filter(
      collection => collection.id !== id,
    );
  }

  removeAllCollections() {
    this.collections = [];
  }
}

export const collectionGroupStore = new CollectionGroupStore();
