import { compareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
import { storageService } from '../../../common/services/StorageService';
import { DataBaseCardsRepositoryImpl } from '../../home/data/DataBaseCardsRepositoryImpl';
import { SettingsRepositoryImpl } from '../data/SettingsRepositoryImpl';
import { useThemeRepository } from '../data/ThemeRepositoryImpl';

export const dataBaseCardsRepository = new DataBaseCardsRepositoryImpl(
  compareLocalDatabase,
);

export const themeRepositoryImp = useThemeRepository;
export const settingsRepositoryImp = new SettingsRepositoryImpl(storageService);
