import { ThemeMode } from '../../../common/styles/ThemeProvider';

export interface ThemeRepository {
  setThemeMode(mode: ThemeMode): void;
}
