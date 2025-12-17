import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import { GetDetailCardRepository } from '../src/features/card/domain/GetDetailCardRepository';
import { useCardScreenViewModel } from '../src/features/card/presentation/useCardScreenViewModel';
import { CardEntity } from '../src/features/home/domaine/entities/CardEntity';
import { SearchCardNamesUseCase } from '../src/features/home/domaine/usecases/SearchCardNamesUseCase';

describe('useCardScreenViewModel', () => {
  const sampleCard: CardEntity = {
    id: '1',
    name: 'Alpha',
    type: 'Fire',
    hp: 100,
    imageUrl: 'x',
    attacks: [],
    weaknesses: [],
    resistances: [],
    setName: 'set name',
  };

  let repo: jest.Mocked<GetDetailCardRepository>;
  let useCase: jest.Mocked<SearchCardNamesUseCase>;

  beforeEach(() => {
    repo = {
      getCardById: jest.fn().mockResolvedValue(sampleCard),
    } as any;
    useCase = {
      execute: jest
        .fn()
        .mockResolvedValue([
          { id: 's1', title: 'Pika', subtitle: 'Electric', imageUrl: 'y' },
        ]),
    } as any;
  });

  it('loads first card detail', async () => {
    const { result } = renderHook(() =>
      useCardScreenViewModel({ repository: repo, useCase }),
    );

    await act(() => result.current.getDetailFirstCard('1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.getCardById).toHaveBeenCalledWith('1');
    await waitFor(() => expect(result.current.firstCard).toEqual(sampleCard));
  });

  it('loads second card detail', async () => {
    const { result } = renderHook(() =>
      useCardScreenViewModel({ repository: repo, useCase }),
    );

    await act(() => result.current.getDetailSecondCard('2'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.getCardById).toHaveBeenCalledWith('2');
    await waitFor(() => expect(result.current.secondCard).toEqual(sampleCard));
  });

  it('handles detail fetch error', async () => {
    repo.getCardById.mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() =>
      useCardScreenViewModel({ repository: repo, useCase }),
    );

    await act(() => result.current.getDetailFirstCard('1'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await waitFor(() => expect(result.current.errorMessage).toBeTruthy());
  });

  it('searches card names for query >= 3', async () => {
    const { result } = renderHook(() =>
      useCardScreenViewModel({ repository: repo, useCase }),
    );

    await act(() => result.current.searchCardNames('pika'));
    await waitFor(() => expect(result.current.isLoadingSearch).toBe(false));

    expect(useCase.execute).toHaveBeenCalledWith('pika');
    await waitFor(() => expect(result.current.cardNames).toHaveLength(1));
  });

  it('ignores short search queries', async () => {
    const { result } = renderHook(() =>
      useCardScreenViewModel({ repository: repo, useCase }),
    );

    await act(() => result.current.searchCardNames('pi'));
    expect(useCase.execute).not.toHaveBeenCalled();
    expect(result.current.cardNames).toEqual([]);
    expect(result.current.isLoadingSearch).toBe(false);
  });
});
