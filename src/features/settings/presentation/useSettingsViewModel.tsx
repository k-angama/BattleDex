import { useState } from 'react';
import { ThemeMode } from '../../../common/styles';
import { safeCall } from '../../../common/utils/safeAsync';
import { DataBaseCardsRepository } from '../../home/domaine/DataBaseCardsRepository';
import { SettingsRepository } from '../domaine/SettingsRepository';
import { ThemeRepository } from '../domaine/ThemeRepository';
import {
  dataBaseCardsRepository,
  settingsRepositoryImp,
} from './settingsScreenDI';

interface SettingsScreenViewModelParams {
  dataBase?: DataBaseCardsRepository;
  themeRepository?: ThemeRepository;
  settingsRepository?: SettingsRepository;
}

export function useSettingsViewModel({
  dataBase = dataBaseCardsRepository,
  settingsRepository = settingsRepositoryImp,
}: SettingsScreenViewModelParams = {}) {
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
    settingsRepository?.setThemeMode(mode);
  };

  return {
    changeTheme,
    clearHistory,
    isClearingHistory,
  };
}
