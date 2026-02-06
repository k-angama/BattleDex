import { ThemeMode } from '../../../common/styles';

export interface ThemeRepository {
  getThemeMode(): ThemeMode;
  setThemeMode(mode: ThemeMode): void;
}
