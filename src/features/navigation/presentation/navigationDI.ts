import { storageService } from '../../../common/services/StorageService';
import { SettingsRepositoryImpl } from '../../settings/data/SettingsRepositoryImpl';
import { useThemeRepository } from '../../settings/data/ThemeRepositoryImpl';

export const settingsRepositoryImp = new SettingsRepositoryImpl(storageService);
export const themeRepositoryImp = useThemeRepository;
