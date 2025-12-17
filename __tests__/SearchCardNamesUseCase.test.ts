import { searchCardSuggestionsMock } from '../src/common/mocks/searchCardSuggestions.mock';
import { APICardsRepository } from '../src/features/home/domaine/APICardsRepository';
import { SearchCardNamesUseCase } from '../src/features/home/domaine/usecases/SearchCardNamesUseCase';

describe('SearchCardNamesUseCase', () => {
  it('debounces calls and resolves search results', async () => {
    jest.useFakeTimers();
    const repo: APICardsRepository = {
      getCardNames: jest
        .fn()
        .mockResolvedValue(
          searchCardSuggestionsMock.filter(card =>
            card.title.toLowerCase().includes('pika'),
          ),
        ),
    };
    const useCase = new SearchCardNamesUseCase(repo, 200);

    const promise = useCase.execute('pika');
    // fast-forward debounce
    jest.advanceTimersByTime(200);
    const results = await promise;

    expect(repo.getCardNames).toHaveBeenCalledWith('pika');
    expect(results.length).toBeGreaterThan(1);
    jest.useRealTimers();
  });

  it('returns multiple matches for a fuzzy search term', async () => {
    jest.useFakeTimers();
    const repo: APICardsRepository = {
      getCardNames: jest
        .fn()
        .mockImplementation(async term =>
          searchCardSuggestionsMock.filter(card =>
            card.title.toLowerCase().includes(term.toLowerCase()),
          ),
        ),
    };
    const useCase = new SearchCardNamesUseCase(repo, 50);

    const promise = useCase.execute('char');
    jest.advanceTimersByTime(50);
    const results = await promise;

    expect(repo.getCardNames).toHaveBeenCalledWith('char');
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(
      results.every(card => card.title.toLowerCase().includes('char')),
    ).toBe(true);
    jest.useRealTimers();
  });

  it('rejects when repository throws', async () => {
    jest.useFakeTimers();
    const repo: APICardsRepository = {
      getCardNames: jest.fn().mockRejectedValue(new Error('fail')),
    };
    const useCase = new SearchCardNamesUseCase(repo, 0);

    const promise = useCase.execute('bad');
    jest.runAllTimers();

    await expect(promise).rejects.toThrow('fail');
    jest.useRealTimers();
  });
});
