import { StorageService } from '../../../common/services/StorageService';
import { isThemeMode, ThemeMode } from '../../../common/styles';
import { SettingsRepository } from '../domaine/SettingsRepository';

export class SettingsRepositoryImpl implements SettingsRepository {
  private storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  getThemeMode(): ThemeMode | undefined {
    const saved = this.storageService.getThemeMode();
    return isThemeMode(saved) ? saved : undefined;
  }

  setThemeMode(mode: ThemeMode): void {
    this.storageService.setThemeMode(mode);
  }
}
