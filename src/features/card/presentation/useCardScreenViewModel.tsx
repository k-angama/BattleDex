import { useCallback, useState } from 'react';
import { safeCall } from '../../../common/utils/safeAsync';
import { CollectionCardEntity } from '../../collection/domaine/entities/CollectionCardEntity';
import { CollectionGroupEntity } from '../../collection/domaine/entities/CollectionGroupEntity';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { SearchCardSuggestionEntity } from '../../home/domaine/entities/SearchCardSuggestionEntity';
import { SearchCardNamesUseCase } from '../../home/domaine/usecases/SearchCardNamesUseCase';
import { searchCardNamesUseCase } from '../../home/presentation/homeScreenDI';
import { GetDetailCardRepository } from '../domain/GetDetailCardRepository';
import type { AddToCollectionRepository } from '../domain/repositories/AddToCollectionRepository';
import type { CreateCollectionRepository } from '../domain/repositories/CreateCollectionRepository';
import {
  addToCollectionRepository,
  createCollectionRepository,
  getDetailCardRepository,
} from './cardScreenDI';

interface CardScreenViewModelParams {
  repository?: GetDetailCardRepository;
  useCase?: SearchCardNamesUseCase;
  addToCollectionRepository?: AddToCollectionRepository;
  createCollectionRepository?: CreateCollectionRepository;
}

export function useCardScreenViewModel({
  repository = getDetailCardRepository,
  useCase = searchCardNamesUseCase,
  addToCollectionRepository: addToCollectionRepo = addToCollectionRepository,
  createCollectionRepository: createCollectionRepo = createCollectionRepository,
}: CardScreenViewModelParams = {}) {
  const [firstCard, setFirstCard] = useState<CardEntity | null>(null);
  const [secondCard, setSecondCard] = useState<CardEntity | null>(null);
  const [selectedCard, setSelectedCard] =
    useState<SearchCardSuggestionEntity | null>(null);
  const [cardNames, setCardNames] = useState<SearchCardSuggestionEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorSearchMessage, setErrorSearchMessage] = useState<string | null>(
    null,
  );
  const [errorCollectionMessage, setErrorCollectionMessage] = useState<
    string | null
  >(null);

  const fetchDetailCard = useCallback(
    async (
      cardId: string,
      setter: React.Dispatch<React.SetStateAction<CardEntity | null>>,
    ) => {
      setIsLoading(true);
      setErrorMessage(null);

      await safeCall(
        () => repository.getCardById(cardId),
        setter,
        setErrorMessage,
        {
          operation: 'Detail Card',
          fallbackMessage: 'Unable to fetch card. Please try again.',
        },
      );

      setIsLoading(false);
    },
    [repository],
  );

  const getDetailFirstCard = useCallback(
    (cardId: string) => fetchDetailCard(cardId, setFirstCard),
    [fetchDetailCard],
  );
  const getDetailSecondCard = useCallback(
    (cardId: string) => fetchDetailCard(cardId, setSecondCard),
    [fetchDetailCard],
  );

  const searchCardNames = useCallback(
    async (name: string) => {
      if (name.length < 3) {
        // Minimum length check
        setCardNames([]);
        setIsLoadingSearch(false);
        return;
      }

      setIsLoadingSearch(true);
      await safeCall(
        () => useCase.execute(name),
        setCardNames,
        setErrorSearchMessage,
        {
          operation: 'Search Card Names',
          fallbackMessage: 'Unable to fetch cards. Please try again.',
        },
      );
      setIsLoadingSearch(false);
    },
    [useCase],
  );

  const setSelectedCardWithLoading = useCallback(
    (card: SearchCardSuggestionEntity | null) => {
      setIsLoading(true);
      setSelectedCard(card);
    },
    [],
  );

  const addCardToCollection = useCallback(
    async (
      card: CardEntity,
      collectionId: string,
    ): Promise<{
      success: boolean;
      error?: string;
      addedCard?: CollectionCardEntity | null;
    }> => {
      setIsLoadingCollection(true);
      setErrorCollectionMessage(null);

      const [result, error] = await safeCall(
        () => addToCollectionRepo.addCard(card, collectionId),
        () => {},
        setErrorCollectionMessage,
        {
          operation: 'Add Card to Collection',
          fallbackMessage:
            'Unable to add card to collection. Please try again.',
        },
      );

      setIsLoadingCollection(false);
      return { success: !error, error: error ?? undefined, addedCard: result };
    },
    [addToCollectionRepo],
  );

  const checkIfCardInCollection = useCallback(
    async (cardId: string, collectionId: string): Promise<boolean> => {
      const [result] = await safeCall(
        () => addToCollectionRepo.isCardInCollection(cardId, collectionId),
        undefined,
        undefined,
        {
          operation: 'Check Card in Collection',
          fallbackMessage: 'Unable to check card status.',
        },
      );
      return result ?? false;
    },
    [addToCollectionRepo],
  );

  const createCollection = useCallback(
    async (
      name: string,
      color: string,
    ): Promise<{
      success: boolean;
      createdCollection?: CollectionGroupEntity | null;
      error?: string;
    }> => {
      setIsLoadingCollection(true);
      setErrorCollectionMessage(null);

      const [result, error] = await safeCall(
        () => createCollectionRepo.createCollection(name, color),
        undefined,
        setErrorCollectionMessage,
        {
          operation: 'Create Collection',
          fallbackMessage: 'Unable to create collection. Please try again.',
        },
      );

      setIsLoadingCollection(false);
      return {
        success: !error,
        createdCollection: result,
        error: error ?? undefined,
      };
    },
    [createCollectionRepo],
  );

  return {
    // Actions
    getDetailFirstCard,
    getDetailSecondCard,
    searchCardNames,
    setSelectedCard: setSelectedCardWithLoading,
    addCardToCollection,
    checkIfCardInCollection,
    createCollection,

    // Data
    firstCard,
    secondCard,
    selectedCard,
    cardNames,

    // Loading & error state
    isLoading,
    isLoadingSearch,
    isLoadingCollection,
    errorMessage,
    errorSearchMessage,
    errorCollectionMessage,
  };
}
