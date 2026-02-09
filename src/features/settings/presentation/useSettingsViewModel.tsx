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

  const clearHistory = async (): Promise<{
    success: boolean;
    error: string | null;
  }> => {
    if (!dataBase) {
      return { success: false, error: 'Database unavailable.' };
    }
    setIsClearingHistory(true);
    const [, error] = await safeCall(
      async () => {
        await dataBase.clearAllComparisons();
      },
      undefined,
      undefined,
      {
        operation: 'Clear history',
        fallbackMessage: 'Unable to clear history. Please try again.',
      },
    );
    setIsClearingHistory(false);
    return { success: !error, error };
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
