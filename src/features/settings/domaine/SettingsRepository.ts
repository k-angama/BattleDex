import { ThemeMode } from '../../../common/styles';

export interface SettingsRepository {
  getThemeMode(): ThemeMode | undefined;
  setThemeMode(mode: ThemeMode): void;
}
