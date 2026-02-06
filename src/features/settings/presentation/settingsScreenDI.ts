import { compareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
import { DataBaseCardsRepositoryImpl } from '../../home/data/DataBaseCardsRepositoryImpl';
import { useThemeRepository } from '../data/ThemeRepositoryImpl';

export const dataBaseCardsRepository = new DataBaseCardsRepositoryImpl(
  compareLocalDatabase,
);

export const themeRepositoryImp = useThemeRepository;
