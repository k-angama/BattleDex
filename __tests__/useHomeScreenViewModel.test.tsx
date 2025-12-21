import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import { compareCardsPreviewMock } from '../src/common/mocks/compareCards.mock';
import { searchCardSuggestionsMock } from '../src/common/mocks/searchCardSuggestions.mock';
import { DataBaseCardsRepository } from '../src/features/home/domaine/DataBaseCardsRepository';
import { CompareCardsPreviewEntity } from '../src/features/home/domaine/entities/CompareCardsPreviewEntity';
import { SearchCardSuggestionEntity } from '../src/features/home/domaine/entities/SearchCardSuggestionEntity';
import { SearchCardNamesUseCase } from '../src/features/home/domaine/usecases/SearchCardNamesUseCase';
import { useHomeScreenViewModel } from '../src/features/home/presentation/useHomeScreenViewModel';

describe('useHomeScreenViewModel', () => {
  let mockDataBase: jest.Mocked<DataBaseCardsRepository>;
  let mockUseCase: jest.Mocked<SearchCardNamesUseCase>;
  let mockCompareCards: CompareCardsPreviewEntity[];
  let mockSearchResults: SearchCardSuggestionEntity[];

  beforeEach(() => {
    mockCompareCards = compareCardsPreviewMock;

    mockSearchResults = searchCardSuggestionsMock.slice(0, 3);

    mockDataBase = {
      getCompareCards: jest.fn().mockResolvedValue(mockCompareCards),
    } as any;

    mockUseCase = {
      execute: jest.fn().mockResolvedValue(mockSearchResults),
    } as any;
  });

  it('fetches compare cards on mount', async () => {
    const { result } = renderHook(() =>
      useHomeScreenViewModel({ dataBase: mockDataBase, useCase: mockUseCase }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockDataBase.getCompareCards).toHaveBeenCalledTimes(1);
    expect(result.current.compareCards).toEqual(mockCompareCards);
    expect(result.current.compareCards).toEqual(mockCompareCards);
    expect(result.current.cardNames).toEqual([]);
    expect(result.current.errorMessage).toBeNull();
  });

  it('reports error when fetch fails', async () => {
    mockDataBase.getCompareCards.mockRejectedValueOnce(
      new Error('fetch failed'),
    );

    const { result } = renderHook(() =>
      useHomeScreenViewModel({ dataBase: mockDataBase, useCase: mockUseCase }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBeTruthy();
    expect(result.current.compareCards).toHaveLength(0);
  });

  it('searches names for queries >= 3 chars', async () => {
    const { result } = renderHook(() =>
      useHomeScreenViewModel({ dataBase: mockDataBase, useCase: mockUseCase }),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(() => result.current.searchCardNames('pika'));

    await waitFor(() => expect(result.current.isLoadingSearch).toBe(false));
    await waitFor(() =>
      expect(result.current.cardNames).toEqual(mockSearchResults),
    );

    expect(mockUseCase.execute).toHaveBeenCalledWith('pika');
    expect(result.current.errorSearchMessage).toBeNull();
  });

  it('ignores short queries (<3 chars)', async () => {
    const { result } = renderHook(() =>
      useHomeScreenViewModel({ dataBase: mockDataBase, useCase: mockUseCase }),
    );

    await act(() => result.current.searchCardNames('pi'));

    expect(mockUseCase.execute).not.toHaveBeenCalled();
    expect(result.current.cardNames).toEqual([]);
    expect(result.current.isLoadingSearch).toBe(false);
  });
});
