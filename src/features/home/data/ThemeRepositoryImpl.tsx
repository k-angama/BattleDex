import { ThemeMode, useTheme } from '../../../common/styles';
import { ThemeRepository } from '../domaine/ThemeRepository';

export function useThemeRepository(): ThemeRepository {
  const { setThemeMode } = useTheme();

  return {
    setThemeMode: (mode: ThemeMode) => setThemeMode(mode),
  };
}
