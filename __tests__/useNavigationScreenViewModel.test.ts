import { renderHook, waitFor } from '@testing-library/react-native';
import { useNavigationScreenViewModel } from '../src/features/navigation/presentation/useNavigationScreenViewModel';
import { SettingsRepository } from '../src/features/settings/domaine/SettingsRepository';

jest.mock('../src/features/settings/presentation/settingsScreenDI', () => ({
  settingsRepositoryImp: {
    getThemeMode: jest.fn(),
    setThemeMode: jest.fn(),
  },
}));

describe('useNavigationScreenViewModel', () => {
  let mockSettingsRepository: jest.Mocked<SettingsRepository>;

  beforeEach(() => {
    mockSettingsRepository = {
      getThemeMode: jest.fn(),
      setThemeMode: jest.fn(),
    } as any;
  });

  it('initializes with default system theme mode', () => {
    mockSettingsRepository.getThemeMode.mockReturnValue(undefined);

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
      }),
    );

    expect(result.current.themeMode).toBe('system');
  });

  it('loads saved dark theme on mount', async () => {
    mockSettingsRepository.getThemeMode.mockReturnValue('dark');

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
      }),
    );

    await waitFor(() => {
      expect(result.current.themeMode).toBe('dark');
    });

    expect(mockSettingsRepository.getThemeMode).toHaveBeenCalled();
  });

  it('loads saved light theme on mount', async () => {
    mockSettingsRepository.getThemeMode.mockReturnValue('light');

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
      }),
    );

    await waitFor(() => {
      expect(result.current.themeMode).toBe('light');
    });

    expect(mockSettingsRepository.getThemeMode).toHaveBeenCalled();
  });

  it('stays on system theme when no saved theme exists', async () => {
    mockSettingsRepository.getThemeMode.mockReturnValue(undefined);

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
      }),
    );

    expect(result.current.themeMode).toBe('system');

    await waitFor(() => {
      expect(result.current.themeMode).toBe('system');
    });
  });

  it('returns themeMode state', async () => {
    mockSettingsRepository.getThemeMode.mockReturnValue('light');

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
      }),
    );

    await waitFor(() => {
      expect(result.current.themeMode).toBeDefined();
      expect(['dark', 'light', 'system']).toContain(result.current.themeMode);
    });
  });

  it('uses default repository when none provided', () => {
    const { result } = renderHook(() => useNavigationScreenViewModel());

    expect(result.current.themeMode).toBeDefined();
  });
});
