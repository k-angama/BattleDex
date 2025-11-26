import { renderHook, waitFor } from '@testing-library/react-native';
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
    hp: 100,
    attacks: [],
    weaknesses: [],
    resistances: [],
  };
  const cardB: CardEntity = { ...cardA, id: 'b', name: 'Beta' };

  const comparison: MatchResultEntity = {
    winnerCard: {
      score: 10,
      offensivePower: 5,
      defensivePower: 5,
      detail: cardA,
    },
    loserCard: {
      score: 8,
      offensivePower: 4,
      defensivePower: 4,
      detail: cardB,
    },
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

    await result.current.compareCards(cardA, cardB);
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

    await result.current.compareCards(cardA, cardB);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.result).toBeNull();
    await waitFor(() => expect(result.current.errorMessage).toBeTruthy());
  });
});
