import { useState } from 'react';
import { ThemeMode } from '../../../common/styles';
import { SettingsRepository } from '../../settings/domaine/SettingsRepository';
import { settingsRepositoryImp } from '../../settings/presentation/settingsScreenDI';

interface NavigationScreenViewModelParams {
  settingsRepository?: SettingsRepository;
}

export function useNavigationScreenViewModel({
  settingsRepository = settingsRepositoryImp,
}: NavigationScreenViewModelParams = {}) {
  const [themeMode] = useState<ThemeMode>(() => {
    return settingsRepository?.getThemeMode() ?? 'system';
  });

  return { themeMode };
}
