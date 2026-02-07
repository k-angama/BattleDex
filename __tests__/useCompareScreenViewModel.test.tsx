import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import { CompareCardRepository } from '../src/features/compare/domaine/CompareCardRepository';
import { DBSaveCardRepository } from '../src/features/compare/domaine/DBSaveCardRepository';
import { MatchResultEntity } from '../src/features/compare/domaine/entities/MatchResultEntity';
import { useCompareScreenViewModel } from '../src/features/compare/presensation/useCompareScreenViewModel';
import { CardEntity } from '../src/features/home/domaine/entities/CardEntity';

describe('useCompareScreenViewModel', () => {
  const cardA: CardEntity = {
    id: 'a',
    name: 'Alpha',
    type: 'Fire',
    hp: '100',
    attacks: [],
    weaknesses: [],
    resistances: [],
    setName: 'Mock Set',
  };
  const cardB: CardEntity = { ...cardA, id: 'b', name: 'Beta' };

  const comparison: MatchResultEntity = {
    winnerCard: {
      powerScore: '10.0',
      staticPowerScore: '5.0',
      finalHp: '100',
      damageDealtp: '50',
      detail: cardA,
    },
    loserCard: {
      powerScore: '8.0',
      staticPowerScore: '4.0',
      finalHp: '80',
      damageDealtp: '40',
      detail: cardB,
    },
    winner: 'card1',
  };

  let repo: jest.Mocked<CompareCardRepository>;
  let dbRepo: jest.Mocked<DBSaveCardRepository>;

  beforeEach(() => {
    repo = {
      compareCards: jest.fn().mockResolvedValue(comparison),
    } as any;
    dbRepo = {
      saveCardToDB: jest.fn().mockResolvedValue(undefined),
    } as any;
  });

  it('compares cards and saves to DB', async () => {
    const { result } = renderHook(() =>
      useCompareScreenViewModel({
        repository: repo,
        dataBaseRepository: dbRepo,
      }),
    );

    await act(() => result.current.onCompareCards(cardA, cardB));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.compareCards).toHaveBeenCalledWith(cardA, cardB);
    await waitFor(() => expect(result.current.result).toEqual(comparison));
    expect(dbRepo.saveCardToDB).toHaveBeenCalledWith(comparison);
    expect(result.current.errorMessage).toBeNull();
  });

  it('handles compare error', async () => {
    repo.compareCards.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() =>
      useCompareScreenViewModel({
        repository: repo,
        dataBaseRepository: dbRepo,
      }),
    );

    await act(() => result.current.onCompareCards(cardA, cardB));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.result).toBeNull();
    await waitFor(() => expect(result.current.errorMessage).toBeTruthy());
  });

  it('skips DB save when isDataLocal is true', async () => {
    const { result } = renderHook(() =>
      useCompareScreenViewModel({
        repository: repo,
        dataBaseRepository: dbRepo,
      }),
    );

    await act(() => result.current.onCompareCards(cardA, cardB, true));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(repo.compareCards).toHaveBeenCalledWith(cardA, cardB);
    await waitFor(() => expect(result.current.result).toEqual(comparison));
    expect(dbRepo.saveCardToDB).not.toHaveBeenCalled();
  });

  it('returns compareCards state', async () => {
    const { result } = renderHook(() =>
      useCompareScreenViewModel({
        repository: repo,
        dataBaseRepository: dbRepo,
      }),
    );

    expect(result.current.compareCards).toBeNull();

    await act(() => result.current.onCompareCards(cardA, cardB));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('clears error message before new comparison', async () => {
    repo.compareCards.mockRejectedValueOnce(new Error('initial fail'));

    const { result } = renderHook(() =>
      useCompareScreenViewModel({
        repository: repo,
        dataBaseRepository: dbRepo,
      }),
    );

    await act(() => result.current.onCompareCards(cardA, cardB));
    await waitFor(() => expect(result.current.errorMessage).toBeTruthy());

    repo.compareCards.mockResolvedValueOnce(comparison);

    await act(() => result.current.onCompareCards(cardA, cardB));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBeNull();
    expect(result.current.result).toEqual(comparison);
  });
});
