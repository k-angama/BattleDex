import type { MMKV } from 'react-native-mmkv';
import { createMMKV } from 'react-native-mmkv';

export class StorageService {
  private storage: MMKV;

  static readonly STORAGE_KEYS = {
    themeMode: 'themeMode',
  } as const;

  constructor(storage?: MMKV) {
    this.storage = storage ?? createMMKV();
  }

  getThemeMode(): string | undefined {
    return this.storage.getString(StorageService.STORAGE_KEYS.themeMode);
  }

  setThemeMode(mode: string): void {
    this.storage.set(StorageService.STORAGE_KEYS.themeMode, mode);
  }
}
