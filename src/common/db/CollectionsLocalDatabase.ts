import {
  ANDROID_DATABASE_PATH,
  DB,
  IOS_LIBRARY_PATH,
  open,
} from '@op-engineering/op-sqlite';
import { Platform } from 'react-native';
import { CollectionCardRowRaw } from './dto/CollectionCardRowRaw';
import { CollectionRowRaw } from './dto/CollectionRowRaw';

export class CollectionsLocalDatabase {
  private db: DB;

  constructor() {
    this.db = open({
      name: 'battledex.db',
      location:
        Platform.OS === 'ios' ? IOS_LIBRARY_PATH : ANDROID_DATABASE_PATH,
    });
    this.db.execute(
      `CREATE TABLE IF NOT EXISTS collections (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        created_date INTEGER NOT NULL
      );`,
    );
    this.db.execute(
      `CREATE TABLE IF NOT EXISTS collection_cards (
        id TEXT PRIMARY KEY,
        collection_id TEXT NOT NULL,
        card_json TEXT NOT NULL,
        added_date INTEGER NOT NULL,
        FOREIGN KEY (collection_id) REFERENCES collections(id)
      );`,
    );
  }

  // ===== COLLECTIONS METHODS =====

  async saveCollection(
    name: string,
    color: string,
    createdDate: Date = new Date(),
  ): Promise<CollectionRowRaw> {
    const id = `${createdDate.getTime()}-${Math.random()
      .toString(36)
      .slice(2)}`;
    const created_date = createdDate.getTime();

    await this.db.executeSync(
      `INSERT INTO collections (id, name, color, created_date)
       VALUES (?, ?, ?, ?);`,
      [id, name, color, created_date],
    );

    return {
      id,
      name,
      color,
      card_count: 0,
      created_date,
    };
  }

  async getCollections(): Promise<CollectionRowRaw[]> {
    const result = await this.db.executeSync(
      `SELECT 
        c.id,
        c.name,
        c.color,
        c.created_date,
        COUNT(cc.id) as card_count
       FROM collections c
       LEFT JOIN collection_cards cc ON c.id = cc.collection_id
       GROUP BY c.id
       ORDER BY c.created_date DESC;`,
    );

    return (result.rows ?? []).map(row => ({
      id: String(row.id),
      name: String(row.name),
      color: String(row.color),
      card_count: Number(row.card_count),
      created_date: Number(row.created_date),
    }));
  }

  async updateCollection(
    id: string,
    name: string,
    color: string,
  ): Promise<void> {
    await this.db.executeSync(
      `UPDATE collections 
       SET name = ?, color = ?
       WHERE id = ?;`,
      [name, color, id],
    );
  }

  async deleteCollection(id: string): Promise<void> {
    // Delete all cards in the collection first
    await this.db.executeSync(
      `DELETE FROM collection_cards WHERE collection_id = ?;`,
      [id],
    );
    // Then delete the collection
    await this.db.executeSync(`DELETE FROM collections WHERE id = ?;`, [id]);
  }

  async deleteCollections(ids: string[]): Promise<void> {
    if (!ids || ids.length === 0) return;
    const placeholders = ids.map(() => '?').join(',');

    // Delete all cards in these collections
    const deleteCardsQuery = `DELETE FROM collection_cards WHERE collection_id IN (${placeholders});`;
    await this.db.executeSync(deleteCardsQuery, ids);

    // Delete the collections
    const deleteCollectionsQuery = `DELETE FROM collections WHERE id IN (${placeholders});`;
    await this.db.executeSync(deleteCollectionsQuery, ids);
  }

  // ===== COLLECTION CARDS METHODS =====

  async addCard(
    collectionId: string,
    cardJson: string,
    addedDate: Date = new Date(),
  ): Promise<CollectionCardRowRaw> {
    const id = `${addedDate.getTime()}-${Math.random().toString(36).slice(2)}`;
    const added_date = addedDate.getTime();

    await this.db.executeSync(
      `INSERT INTO collection_cards (id, collection_id, card_json, added_date)
       VALUES (?, ?, ?, ?);`,
      [id, collectionId, cardJson, added_date],
    );

    return {
      id,
      collection_id: collectionId,
      card_json: cardJson,
      added_date,
    };
  }

  async getCardsForCollection(
    collectionId: string,
  ): Promise<CollectionCardRowRaw[]> {
    const result = await this.db.executeSync(
      `SELECT id, collection_id, card_json, added_date
       FROM collection_cards
       WHERE collection_id = ?
       ORDER BY CAST(json_extract(card_json, '$.staticScore') AS REAL) DESC;`,
      [collectionId],
    );

    return (result.rows ?? []).map(row => ({
      id: String(row.id),
      collection_id: String(row.collection_id),
      card_json: String(row.card_json),
      added_date: Number(row.added_date),
    }));
  }

  async removeCard(cardId: string): Promise<void> {
    await this.db.executeSync(`DELETE FROM collection_cards WHERE id = ?;`, [
      cardId,
    ]);
  }

  async removeCards(cardIds: string[]): Promise<void> {
    if (!cardIds || cardIds.length === 0) return;
    const placeholders = cardIds.map(() => '?').join(',');
    const query = `DELETE FROM collection_cards WHERE id IN (${placeholders});`;
    await this.db.executeSync(query, cardIds);
  }

  async isCardInCollection(
    cardId: string,
    collectionId: string,
  ): Promise<boolean> {
    const result = await this.db.executeSync(
      `SELECT 1 AS exists_flag
       FROM collection_cards
       WHERE collection_id = ?
         AND json_extract(card_json, '$.id') = ?
       LIMIT 1;`,
      [collectionId, cardId],
    );
    return (result.rows ?? []).length > 0;
  }

  async clearAllCollections(): Promise<void> {
    await this.db.executeSync(`DELETE FROM collection_cards;`);
    await this.db.executeSync(`DELETE FROM collections;`);
  }
}

export const collectionsLocalDatabase = new CollectionsLocalDatabase();
