import { useState } from 'react';
import { ThemeMode } from '../../../common/styles';
import { safeCall } from '../../../common/utils/safeAsync';
import { DataBaseCardsRepository } from '../../home/domaine/DataBaseCardsRepository';
import { ThemeRepository } from '../domaine/ThemeRepository';
import {
  dataBaseCardsRepository,
  themeRepositoryImp,
} from './settingsScreenDI';

interface SettingsScreenViewModelParams {
  dataBase?: DataBaseCardsRepository;
  themeRepository?: ThemeRepository;
}

export function useSettingsViewModel({
  dataBase = dataBaseCardsRepository,
  themeRepository = themeRepositoryImp(),
}: SettingsScreenViewModelParams) {
  const [isClearingHistory, setIsClearingHistory] = useState(false);

  const clearHistory = async () => {
    if (!dataBase) return;
    setIsClearingHistory(true);
    await safeCall(async () => {
      await dataBase.clearAllComparisons();
    });
    setIsClearingHistory(false);
  };

  const changeTheme = (mode: ThemeMode) => {
    themeRepository?.setThemeMode(mode);
  };

  return {
    themeMode: themeRepository?.getThemeMode(),
    changeTheme,
    clearHistory,
    isClearingHistory,
  };
}
