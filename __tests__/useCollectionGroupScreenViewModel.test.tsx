import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import { CollectionGroupEntity } from '../src/features/collection/domaine/entities/CollectionGroupEntity';
import { CollectionGroupRepository } from '../src/features/collection/domaine/repositories/CollectionGroupRepository';
import { useCollectionGroupScreenViewModel } from '../src/features/collection/presentation/collectionGroup/useCollectionGroupScreenViewModel';

describe('useCollectionGroupScreenViewModel', () => {
  const sampleCollections: CollectionGroupEntity[] = [
    {
      id: 'col1',
      name: 'Favorites',
      color: '#FF6B6B',
      cardCount: 10,
    },
    {
      id: 'col2',
      name: 'Rare Cards',
      color: '#4ECDC4',
      cardCount: 5,
    },
  ];

  let repo: jest.Mocked<CollectionGroupRepository>;

  beforeEach(() => {
    repo = {
      getCollections: jest.fn().mockResolvedValue(sampleCollections),
      addCollection: jest.fn().mockResolvedValue({
        id: 'col3',
        name: 'New Collection',
        color: '#45B7D1',
        cardCount: 0,
      }),
      updateCollection: jest.fn().mockResolvedValue(undefined),
      removeCollection: jest.fn().mockResolvedValue(undefined),
    } as any;
  });

  it('loads collections on mount', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.getCollections).toHaveBeenCalled();
    await waitFor(() =>
      expect(result.current.collections).toEqual(sampleCollections),
    );
    expect(result.current.errorMessage).toBeNull();
  });

  it('handles fetch error on mount', async () => {
    repo.getCollections.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.collections).toEqual([]);
    await waitFor(() => expect(result.current.errorMessage).toBeTruthy());
  });

  it('adds a new collection successfully', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let addResult: {
      success: boolean;
      error: string | null;
      createdCollection?: CollectionGroupEntity;
    } = { success: false, error: null };

    await act(async () => {
      addResult = await result.current.addCollection(
        'New Collection',
        '#45B7D1',
      );
    });

    expect(repo.addCollection).toHaveBeenCalledWith(
      'New Collection',
      '#45B7D1',
    );
    expect(addResult.success).toBe(true);
    expect(addResult.error).toBeNull();
    expect(addResult.createdCollection).toBeDefined();
    expect(addResult.createdCollection?.name).toBe('New Collection');
  });

  it('handles add collection error', async () => {
    repo.addCollection.mockRejectedValueOnce(new Error('Add failed'));

    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let addResult: {
      success: boolean;
      error: string | null;
      createdCollection?: CollectionGroupEntity;
    } = { success: false, error: null };

    await act(async () => {
      addResult = await result.current.addCollection(
        'New Collection',
        '#45B7D1',
      );
    });

    expect(addResult.success).toBe(false);
    expect(addResult.error).toBeTruthy();
    expect(addResult.createdCollection).toBeUndefined();
  });

  it('updates a collection successfully', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const updatedCollection: CollectionGroupEntity = {
      id: 'col1',
      name: 'Updated Name',
      color: '#FF0000',
      cardCount: 15,
    };

    let updateResult: { success: boolean; error: string | null } = {
      success: false,
      error: null,
    };

    await act(async () => {
      updateResult = await result.current.updateCollection(updatedCollection);
    });

    expect(repo.updateCollection).toHaveBeenCalledWith(updatedCollection);
    expect(updateResult.success).toBe(true);
    expect(updateResult.error).toBeNull();
  });

  it('handles update collection error', async () => {
    repo.updateCollection.mockRejectedValueOnce(new Error('Update failed'));

    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const updatedCollection: CollectionGroupEntity = {
      id: 'col1',
      name: 'Updated Name',
      color: '#FF0000',
      cardCount: 15,
    };

    let updateResult: { success: boolean; error: string | null } = {
      success: false,
      error: null,
    };

    await act(async () => {
      updateResult = await result.current.updateCollection(updatedCollection);
    });

    expect(updateResult.success).toBe(false);
    expect(updateResult.error).toBeTruthy();
  });

  it('removes a collection successfully', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let removeResult: { success: boolean; error: string | null } = {
      success: false,
      error: null,
    };

    await act(async () => {
      removeResult = await result.current.removeCollection('col1');
    });

    expect(repo.removeCollection).toHaveBeenCalledWith('col1');
    expect(removeResult.success).toBe(true);
    expect(removeResult.error).toBeNull();
  });

  it('handles remove collection error', async () => {
    repo.removeCollection.mockRejectedValueOnce(new Error('Delete failed'));

    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let removeResult: { success: boolean; error: string | null } = {
      success: false,
      error: null,
    };

    await act(async () => {
      removeResult = await result.current.removeCollection('col1');
    });

    expect(removeResult.success).toBe(false);
    expect(removeResult.error).toBeTruthy();
  });

  it('can manually refresh collections', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const initialCallCount = repo.getCollections.mock.calls.length;

    await act(async () => {
      await result.current.getCollections();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.getCollections).toHaveBeenCalledTimes(initialCallCount + 1);
  });

  it('sets loading state during operations', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    // Initial loading on mount
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('clears error message before add operation', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Add operation should clear any errors
    await act(async () => {
      await result.current.addCollection('New Collection', '#45B7D1');
    });

    expect(result.current.errorMessage).toBeNull();
  });

  it('clears error message before update operation', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Update operation should maintain clean error state
    await act(async () => {
      await result.current.updateCollection(sampleCollections[0]);
    });

    expect(result.current.errorMessage).toBeNull();
  });

  it('clears error message before remove operation', async () => {
    const { result } = renderHook(() =>
      useCollectionGroupScreenViewModel({ repository: repo }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Remove operation should maintain clean error state
    await act(async () => {
      await result.current.removeCollection('col2');
    });

    expect(result.current.errorMessage).toBeNull();
  });
});
