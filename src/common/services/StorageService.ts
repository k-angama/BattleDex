import { createMMKV } from 'react-native-mmkv';
import type { MMKV } from 'react-native-mmkv';

export const STORAGE_KEYS = {
  themeMode: 'themeMode',
} as const;

export class StorageService {
  private storage: MMKV;

  constructor(storage?: MMKV) {
    this.storage = storage ?? createMMKV();
  }

  getString(key: string): string | undefined {
    return this.storage.getString(key) ?? undefined;
  }

  setString(key: string, value: string): void {
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.remove(key);
  }
}

export const storageService = new StorageService();
