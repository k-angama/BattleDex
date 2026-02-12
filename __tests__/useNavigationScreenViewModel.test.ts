import { renderHook, waitFor } from '@testing-library/react-native';
import type { CollectionGroupEntity } from '../src/features/collection/domaine/entities/CollectionGroupEntity';
import { CollectionGroupRepository } from '../src/features/collection/domaine/repositories/CollectionGroupRepository';
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
  let mockCollectionGroupRepository: jest.Mocked<CollectionGroupRepository>;

  const mockCollections: CollectionGroupEntity[] = [
    { id: '1', name: 'Favorites', cardCount: 5, color: '#FF6B6B' },
    { id: '2', name: 'Rare Cards', cardCount: 3, color: '#4ECDC4' },
  ];

  beforeEach(() => {
    mockSettingsRepository = {
      getThemeMode: jest.fn(),
      setThemeMode: jest.fn(),
    } as any;

    mockCollectionGroupRepository = {
      getCollections: jest.fn(),
      addCollection: jest.fn(),
      updateCollection: jest.fn(),
      removeCollection: jest.fn(),
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

  // Collection loading tests
  it('calls getCollections on mount', async () => {
    mockCollectionGroupRepository.getCollections.mockResolvedValue(
      mockCollections,
    );

    renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
        collectionGroupRepository: mockCollectionGroupRepository,
      }),
    );

    await waitFor(() => {
      expect(mockCollectionGroupRepository.getCollections).toHaveBeenCalled();
    });
  });

  it('sets collections state after successful load', async () => {
    mockCollectionGroupRepository.getCollections.mockResolvedValue(
      mockCollections,
    );

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
        collectionGroupRepository: mockCollectionGroupRepository,
      }),
    );

    await waitFor(() => {
      expect(result.current.collections).toEqual(mockCollections);
    });

    expect(result.current.collections).toHaveLength(2);
    expect(result.current.collections[0].name).toBe('Favorites');
  });

  it('initializes with empty collections array', () => {
    mockCollectionGroupRepository.getCollections.mockResolvedValue([]);

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
        collectionGroupRepository: mockCollectionGroupRepository,
      }),
    );

    expect(result.current.collections).toEqual([]);
  });

  it('handles getCollections error gracefully', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockCollectionGroupRepository.getCollections.mockRejectedValue(
      new Error('Database error'),
    );

    const { result } = renderHook(() =>
      useNavigationScreenViewModel({
        settingsRepository: mockSettingsRepository,
        collectionGroupRepository: mockCollectionGroupRepository,
      }),
    );

    await waitFor(() => {
      expect(mockCollectionGroupRepository.getCollections).toHaveBeenCalled();
    });

    // Collections should remain empty on error
    expect(result.current.collections).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to load collections:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });
});
