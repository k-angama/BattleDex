import { useEffect } from 'react';
import { SettingsRepository } from '../../settings/domaine/SettingsRepository';
import { ThemeRepository } from '../../settings/domaine/ThemeRepository';
import { settingsRepositoryImp, themeRepositoryImp } from './navigationDI';

interface NavigationScreenViewModelParams {
  settingsRepository?: SettingsRepository;
  themeRepository?: ThemeRepository;
}

export function useNavigationScreenViewModel({
  settingsRepository = settingsRepositoryImp,
  themeRepository = themeRepositoryImp(),
}: NavigationScreenViewModelParams = {}) {
  useEffect(() => {
    const saved = settingsRepository?.getThemeMode();
    if (saved) {
      themeRepository?.setThemeMode(saved);
    }
  }, [settingsRepository, themeRepository]);
}
