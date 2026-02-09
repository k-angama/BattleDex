import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import { DataBaseCardsRepository } from '../src/features/home/domaine/DataBaseCardsRepository';
import { SettingsRepository } from '../src/features/settings/domaine/SettingsRepository';
import { useSettingsViewModel } from '../src/features/settings/presentation/useSettingsViewModel';

jest.mock('../src/features/settings/presentation/settingsScreenDI', () => ({
  dataBaseCardsRepository: {
    clearAllComparisons: jest.fn(),
  },
  settingsRepositoryImp: {
    getThemeMode: jest.fn(),
    setThemeMode: jest.fn(),
  },
}));

describe('useSettingsViewModel', () => {
  let mockDataBase: jest.Mocked<DataBaseCardsRepository>;
  let mockSettingsRepository: jest.Mocked<SettingsRepository>;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    mockDataBase = {
      getCompareCards: jest.fn(),
      deleteComparison: jest.fn(),
      deleteComparisons: jest.fn(),
      clearAllComparisons: jest.fn().mockResolvedValue(undefined),
    } as any;

    mockSettingsRepository = {
      getThemeMode: jest.fn(),
      setThemeMode: jest.fn(),
    } as any;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('clears history successfully', async () => {
    const { result } = renderHook(() =>
      useSettingsViewModel({
        dataBase: mockDataBase,
        settingsRepository: mockSettingsRepository,
      }),
    );

    let response: Awaited<ReturnType<typeof result.current.clearHistory>> | undefined;

    await act(async () => {
      response = await result.current.clearHistory();
    });

    expect(mockDataBase.clearAllComparisons).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ success: true, error: null });
    expect(result.current.isClearingHistory).toBe(false);
  });

  it('returns an error when clear history fails', async () => {
    mockDataBase.clearAllComparisons.mockRejectedValueOnce(
      new Error('db error'),
    );

    const { result } = renderHook(() =>
      useSettingsViewModel({
        dataBase: mockDataBase,
        settingsRepository: mockSettingsRepository,
      }),
    );

    let response: Awaited<ReturnType<typeof result.current.clearHistory>> | undefined;

    await act(async () => {
      response = await result.current.clearHistory();
    });

    expect(mockDataBase.clearAllComparisons).toHaveBeenCalledTimes(1);
    expect(response?.success).toBe(false);
    expect(response?.error).toBe('Unable to clear history. Please try again.');
    expect(result.current.isClearingHistory).toBe(false);
  });

  it('returns an error when database is unavailable', async () => {
    const { result } = renderHook(() =>
      useSettingsViewModel({
        dataBase: null as any,
        settingsRepository: mockSettingsRepository,
      }),
    );

    let response: Awaited<ReturnType<typeof result.current.clearHistory>> | undefined;

    await act(async () => {
      response = await result.current.clearHistory();
    });

    expect(response).toEqual({
      success: false,
      error: 'Database unavailable.',
    });
    expect(result.current.isClearingHistory).toBe(false);
  });

  it('toggles isClearingHistory while pending', async () => {
    let resolvePromise: (() => void) | undefined;
    const pending = new Promise<void>(resolve => {
      resolvePromise = resolve;
    });

    mockDataBase.clearAllComparisons.mockReturnValueOnce(pending);

    const { result } = renderHook(() =>
      useSettingsViewModel({
        dataBase: mockDataBase,
        settingsRepository: mockSettingsRepository,
      }),
    );

    let clearPromise: Promise<{ success: boolean; error: string | null }>;

    act(() => {
      clearPromise = result.current.clearHistory();
    });

    expect(result.current.isClearingHistory).toBe(true);

    await act(async () => {
      resolvePromise?.();
      await clearPromise;
    });

    await waitFor(() => {
      expect(result.current.isClearingHistory).toBe(false);
    });
  });

  it('persists theme changes', () => {
    const { result } = renderHook(() =>
      useSettingsViewModel({
        dataBase: mockDataBase,
        settingsRepository: mockSettingsRepository,
      }),
    );

    act(() => {
      result.current.changeTheme('dark');
    });

    expect(mockSettingsRepository.setThemeMode).toHaveBeenCalledWith('dark');
  });
});
