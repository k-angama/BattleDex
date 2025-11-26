import { APICardsRepository } from '../src/features/home/domaine/APICardsRepository';
import { SearchCardNamesUseCase } from '../src/features/home/domaine/usecases/SearchCardNamesUseCase';

describe('SearchCardNamesUseCase', () => {
  it('debounces calls and resolves search results', async () => {
    jest.useFakeTimers();
    const repo: APICardsRepository = {
      getCardNames: jest
        .fn()
        .mockResolvedValue([{ id: '1', title: 'Pika', subtitle: '', imageUrl: '' }]),
    };
    const useCase = new SearchCardNamesUseCase(repo, 200);

    const promise = useCase.execute('pika');
    // fast-forward debounce
    jest.advanceTimersByTime(200);
    const results = await promise;

    expect(repo.getCardNames).toHaveBeenCalledWith('pika');
    expect(results).toHaveLength(1);
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
