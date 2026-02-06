import {
  ANDROID_DATABASE_PATH,
  DB,
  IOS_LIBRARY_PATH,
  open,
} from '@op-engineering/op-sqlite';
import { Platform } from 'react-native';
import { CompareRowRaw } from './dto/CompareRowRaw';

export class CompareLocalDatabase {
  private db: DB;

  constructor() {
    this.db = open({
      name: 'battledex.db',
      location:
        Platform.OS === 'ios' ? IOS_LIBRARY_PATH : ANDROID_DATABASE_PATH,
    });
    this.db.execute(
      `CREATE TABLE IF NOT EXISTS compare_results (
        id TEXT PRIMARY KEY,
        winner TEXT NOT NULL DEFAULT 'none',
        winner_json TEXT NOT NULL,
        loser_json TEXT NOT NULL,
        comparison_date INTEGER NOT NULL 
      );`,
    );
  }

  async saveMatchResult(
    winnerJson: string,
    loserJson: string,
    winner: string = 'none',
    comparisonDate: Date = new Date(),
  ): Promise<void> {
    const id = `${comparisonDate.getTime()}-${Math.random()
      .toString(36)
      .slice(2)}`;

    const winner_json = winnerJson;
    const loser_json = loserJson;
    const comparison_date = comparisonDate.getTime();

    await this.db.executeSync(
      `INSERT OR REPLACE INTO compare_results (id, winner, winner_json, loser_json, comparison_date)
       VALUES (?, ?, ?, ?, ?);`,
      [id, winner, winner_json, loser_json, comparison_date],
    );
  }

  async getCompareCards(): Promise<CompareRowRaw[]> {
    const result = await this.db.executeSync(
      'SELECT id, winner, winner_json, loser_json, comparison_date FROM compare_results ORDER BY comparison_date DESC;',
    );
    return (result.rows ?? []).map(row => ({
      id: String(row.id),
      winner: row.winner ? String(row.winner) : 'none',
      winner_json: String(row.winner_json),
      loser_json: String(row.loser_json),
      comparison_date: Number(row.comparison_date),
    }));
  }

  async deleteCompareById(id: string): Promise<void> {
    await this.db.executeSync('DELETE FROM compare_results WHERE id = ?;', [
      id,
    ]);
  }

  async deleteCompareByIds(ids: string[]): Promise<void> {
    if (!ids || ids.length === 0) return;
    // Build placeholders for parameterized query
    const placeholders = ids.map(() => '?').join(',');
    const query = `DELETE FROM compare_results WHERE id IN (${placeholders});`;
    await this.db.executeSync(query, ids);
  }

  async clearAllComparisons(): Promise<void> {
    await this.db.executeSync('DELETE FROM compare_results;');
  }
}

export const compareLocalDatabase = new CompareLocalDatabase();
