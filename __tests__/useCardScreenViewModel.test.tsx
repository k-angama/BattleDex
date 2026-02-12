import { renderHook, waitFor } from '@testing-library/react-native';
import { act } from 'react';
import { GetDetailCardRepository } from '../src/features/card/domain/GetDetailCardRepository';
import type { AddToCollectionRepository } from '../src/features/card/domain/repositories/AddToCollectionRepository';
import type { CreateCollectionRepository } from '../src/features/card/domain/repositories/CreateCollectionRepository';
import { useCardScreenViewModel } from '../src/features/card/presentation/useCardScreenViewModel';
import { CardEntity } from '../src/features/home/domaine/entities/CardEntity';
import { SearchCardNamesUseCase } from '../src/features/home/domaine/usecases/SearchCardNamesUseCase';

describe('useCardScreenViewModel', () => {
  const sampleCard: CardEntity = {
    id: '1',
    name: 'Alpha',
    type: 'Fire',
    hp: '100',
    imageUrl: 'x',
    attacks: [],
    weaknesses: [],
    resistances: [],
    setName: 'set name',
    staticScore: '5.0',
  };

  let repo: jest.Mocked<GetDetailCardRepository>;
  let useCase: jest.Mocked<SearchCardNamesUseCase>;
  let addToCollectionRepo: jest.Mocked<AddToCollectionRepository>;
  let createCollectionRepo: jest.Mocked<CreateCollectionRepository>;

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
    addToCollectionRepo = {
      addCard: jest.fn().mockResolvedValue({
        id: '1',
        title: 'Alpha',
        staticScore: '5.0',
        imageUrl: 'x',
      }),
      isCardInCollection: jest.fn().mockResolvedValue(false),
    } as any;
    createCollectionRepo = {
      createCollection: jest.fn().mockResolvedValue({
        id: 'col1',
        name: 'My Collection',
        color: '#FF0000',
        cardCount: 0,
      }),
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

  it('adds card to collection successfully', async () => {
    const { result } = renderHook(() =>
      useCardScreenViewModel({
        repository: repo,
        useCase,
        addToCollectionRepository: addToCollectionRepo,
      }),
    );

    let addResult: any;
    await act(async () => {
      addResult = await result.current.addCardToCollection(sampleCard, 'col1');
    });

    await waitFor(() => expect(result.current.isLoadingCollection).toBe(false));

    expect(addToCollectionRepo.addCard).toHaveBeenCalledWith(
      sampleCard,
      'col1',
    );
    expect(addResult.success).toBe(true);
    expect(addResult.addedCard).toBeDefined();
    expect(addResult.error).toBeUndefined();
    expect(result.current.errorCollectionMessage).toBeNull();
  });

  it('handles add card to collection error', async () => {
    addToCollectionRepo.addCard.mockRejectedValueOnce(new Error('Add failed'));
    const { result } = renderHook(() =>
      useCardScreenViewModel({
        repository: repo,
        useCase,
        addToCollectionRepository: addToCollectionRepo,
      }),
    );

    let addResult: any;
    await act(async () => {
      addResult = await result.current.addCardToCollection(sampleCard, 'col1');
    });

    await waitFor(() => expect(result.current.isLoadingCollection).toBe(false));

    expect(addResult.success).toBe(false);
    expect(addResult.error).toBeTruthy();
    expect(result.current.errorCollectionMessage).toBeTruthy();
  });

  it('checks if card is in collection', async () => {
    addToCollectionRepo.isCardInCollection.mockResolvedValueOnce(true);
    const { result } = renderHook(() =>
      useCardScreenViewModel({
        repository: repo,
        useCase,
        addToCollectionRepository: addToCollectionRepo,
      }),
    );

    let isInCollection: boolean = false;
    await act(async () => {
      isInCollection = await result.current.checkIfCardInCollection(
        '1',
        'col1',
      );
    });

    expect(addToCollectionRepo.isCardInCollection).toHaveBeenCalledWith(
      '1',
      'col1',
    );
    expect(isInCollection).toBe(true);
  });

  it('creates collection successfully', async () => {
    const { result } = renderHook(() =>
      useCardScreenViewModel({
        repository: repo,
        useCase,
        createCollectionRepository: createCollectionRepo,
      }),
    );

    let createResult: any;
    await act(async () => {
      createResult = await result.current.createCollection(
        'My Collection',
        '#FF0000',
      );
    });

    await waitFor(() => expect(result.current.isLoadingCollection).toBe(false));

    expect(createCollectionRepo.createCollection).toHaveBeenCalledWith(
      'My Collection',
      '#FF0000',
    );
    expect(createResult.success).toBe(true);
    expect(createResult.createdCollection).toBeDefined();
    expect(createResult.error).toBeUndefined();
    expect(result.current.errorCollectionMessage).toBeNull();
  });

  it('handles create collection error', async () => {
    createCollectionRepo.createCollection.mockRejectedValueOnce(
      new Error('Create failed'),
    );
    const { result } = renderHook(() =>
      useCardScreenViewModel({
        repository: repo,
        useCase,
        createCollectionRepository: createCollectionRepo,
      }),
    );

    let createResult: any;
    await act(async () => {
      createResult = await result.current.createCollection(
        'My Collection',
        '#FF0000',
      );
    });

    await waitFor(() => expect(result.current.isLoadingCollection).toBe(false));

    expect(createResult.success).toBe(false);
    expect(createResult.error).toBeTruthy();
    expect(result.current.errorCollectionMessage).toBeTruthy();
  });

  it('manages isLoadingCollection state during operations', async () => {
    // Add delay to mock to catch loading state
    addToCollectionRepo.addCard.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                id: '1',
                title: 'Alpha',
                staticScore: '5.0',
                imageUrl: 'x',
              }),
            100,
          ),
        ),
    );

    const { result } = renderHook(() =>
      useCardScreenViewModel({
        repository: repo,
        useCase,
        addToCollectionRepository: addToCollectionRepo,
      }),
    );

    expect(result.current.isLoadingCollection).toBe(false);

    act(() => {
      result.current.addCardToCollection(sampleCard, 'col1');
    });

    await waitFor(() => expect(result.current.isLoadingCollection).toBe(true));
    await waitFor(() => expect(result.current.isLoadingCollection).toBe(false));
  });

  it('clears errorCollectionMessage on successful operation', async () => {
    const { result } = renderHook(() =>
      useCardScreenViewModel({
        repository: repo,
        useCase,
        addToCollectionRepository: addToCollectionRepo,
      }),
    );

    // First call fails
    addToCollectionRepo.addCard.mockRejectedValueOnce(new Error('Fail'));
    await act(async () => {
      await result.current.addCardToCollection(sampleCard, 'col1');
    });
    await waitFor(() =>
      expect(result.current.errorCollectionMessage).toBeTruthy(),
    );

    // Second call succeeds
    addToCollectionRepo.addCard.mockResolvedValueOnce({
      id: '1',
      title: 'Alpha',
      staticScore: '5.0',
      imageUrl: 'x',
    });
    await act(async () => {
      await result.current.addCardToCollection(sampleCard, 'col1');
    });
    await waitFor(() =>
      expect(result.current.errorCollectionMessage).toBeNull(),
    );
  });
});
