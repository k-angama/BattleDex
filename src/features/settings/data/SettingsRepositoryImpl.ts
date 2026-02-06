import { ThemeMode } from '../../../common/styles';
import { STORAGE_KEYS, StorageService } from '../../../common/services/StorageService';
import { SettingsRepository } from '../domaine/SettingsRepository';

const isThemeMode = (value?: string): value is ThemeMode => {
  return value === 'dark' || value === 'light' || value === 'system';
};

export class SettingsRepositoryImpl implements SettingsRepository {
  private storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  getThemeMode(): ThemeMode | undefined {
    const saved = this.storageService.getString(STORAGE_KEYS.themeMode);
    return isThemeMode(saved) ? saved : undefined;
  }

  setThemeMode(mode: ThemeMode): void {
    this.storageService.setString(STORAGE_KEYS.themeMode, mode);
  }
}
