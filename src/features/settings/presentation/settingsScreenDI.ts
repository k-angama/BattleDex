import { compareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
import { StorageService } from '../../../common/services/StorageService';
import { DataBaseCardsRepositoryImpl } from '../../home/data/DataBaseCardsRepositoryImpl';
import { SettingsRepositoryImpl } from '../data/SettingsRepositoryImpl';

export const dataBaseCardsRepository = new DataBaseCardsRepositoryImpl(
  compareLocalDatabase,
);

const storageService = new StorageService();
export const settingsRepositoryImp = new SettingsRepositoryImpl(storageService);
