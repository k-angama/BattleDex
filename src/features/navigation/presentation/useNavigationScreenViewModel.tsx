import { useEffect, useState } from 'react';
import { ThemeMode } from '../../../common/styles';
import { SettingsRepository } from '../../settings/domaine/SettingsRepository';
import { settingsRepositoryImp } from '../../settings/presentation/settingsScreenDI';

interface NavigationScreenViewModelParams {
  settingsRepository?: SettingsRepository;
}

export function useNavigationScreenViewModel({
  settingsRepository = settingsRepositoryImp,
}: NavigationScreenViewModelParams = {}) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const saved = settingsRepository?.getThemeMode();
    if (saved) {
      setThemeMode(saved);
    }
  }, [settingsRepository]);

  return { themeMode };
}
