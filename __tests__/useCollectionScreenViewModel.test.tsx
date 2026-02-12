import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import { CollectionCardEntity } from '../src/features/collection/domaine/entities/CollectionCardEntity';
import { CollectionCardRepository } from '../src/features/collection/domaine/repositories/CollectionCardRepository';
import { useCollectionScreenViewModel } from '../src/features/collection/presentation/collection/useCollectionScreenViewModel';

describe('useCollectionScreenViewModel', () => {
  const sampleCards: CollectionCardEntity[] = [
    {
      id: 'card1',
      title: 'Pikachu',
      staticScore: '100',
      imageUrl: 'https://example.com/pikachu.png',
    },
    {
      id: 'card2',
      title: 'Charizard',
      staticScore: '150',
      imageUrl: 'https://example.com/charizard.png',
    },
  ];

  let repo: jest.Mocked<CollectionCardRepository>;

  beforeEach(() => {
    repo = {
      getCardsByCollectionId: jest.fn().mockResolvedValue(sampleCards),
      removeCard: jest.fn().mockResolvedValue(undefined),
    } as any;
  });

  it('loads cards for a collection', async () => {
    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    await act(() => result.current.getCards('collection1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.getCardsByCollectionId).toHaveBeenCalledWith('collection1');
    await waitFor(() => expect(result.current.cards).toEqual(sampleCards));
    expect(result.current.errorMessage).toBeNull();
  });

  it('handles fetch error', async () => {
    repo.getCardsByCollectionId.mockRejectedValueOnce(
      new Error('Network error'),
    );

    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    await act(() => result.current.getCards('collection1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.cards).toEqual([]);
    await waitFor(() => expect(result.current.errorMessage).toBeTruthy());
  });

  it('returns empty array when no cards', async () => {
    repo.getCardsByCollectionId.mockResolvedValueOnce([]);

    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    await act(() => result.current.getCards('collection1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.cards).toEqual([]);
    expect(result.current.errorMessage).toBeNull();
  });

  it('removes a card successfully', async () => {
    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    let removeResult: { success: boolean; error: string | null } = {
      success: false,
      error: null,
    };

    await act(async () => {
      removeResult = await result.current.removeCard('collection1', 'card1');
    });

    expect(repo.removeCard).toHaveBeenCalledWith('card1');
    expect(removeResult.success).toBe(true);
    expect(removeResult.error).toBeNull();
    expect(result.current.errorMessage).toBeNull();
  });

  it('handles remove card error', async () => {
    repo.removeCard.mockRejectedValueOnce(new Error('Delete failed'));

    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    let removeResult: { success: boolean; error: string | null } = {
      success: false,
      error: null,
    };

    await act(async () => {
      removeResult = await result.current.removeCard('collection1', 'card1');
    });

    expect(result.current.errorMessage).toBeTruthy();
    expect(removeResult.success).toBe(false);
    expect(removeResult.error).toBeTruthy();
  });

  it('sets loading state during fetch', async () => {
    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    await act(() => result.current.getCards('collection1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.getCardsByCollectionId).toHaveBeenCalledWith('collection1');
  });

  it('clears error message before new fetch', async () => {
    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    await act(() => result.current.getCards('collection1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBeNull();
    expect(result.current.cards).toEqual(sampleCards);
  });

  it('clears error message before remove card', async () => {
    const { result } = renderHook(() =>
      useCollectionScreenViewModel({ repository: repo }),
    );

    let removeResult: { success: boolean; error: string | null } = {
      success: false,
      error: null,
    };

    await act(async () => {
      removeResult = await result.current.removeCard('collection1', 'card1');
    });

    expect(removeResult.success).toBe(true);
    expect(result.current.errorMessage).toBeNull();
  });
});
