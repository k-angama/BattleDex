import { useTheme, ThemeMode } from '../../../common/styles';
import { ThemeRepository } from '../domaine/ThemeRepository';

export function useThemeRepository(): ThemeRepository {
  const { themeMode, setThemeMode } = useTheme();

  return {
    getThemeMode: () => themeMode,
    setThemeMode: (mode: ThemeMode) => setThemeMode(mode),
  };
}
