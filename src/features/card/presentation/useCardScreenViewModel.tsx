import { useCallback, useState } from 'react';
import { safeCall } from '../../../common/utils/safeAsync';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { SearchCardSuggestionEntity } from '../../home/domaine/entities/SearchCardSuggestionEntity';
import { SearchCardNamesUseCase } from '../../home/domaine/usecases/SearchCardNamesUseCase';
import { searchCardNamesUseCase } from '../../home/presentation/homeScreenDI';
import { GetDetailCardRepository } from '../domain/GetDetailCardRepository';
import { getDetailCardRepository } from './cardScreenDI';

interface CardScreenViewModelParams {
  repository?: GetDetailCardRepository;
  useCase?: SearchCardNamesUseCase;
}

export function useCardScreenViewModel({
  repository = getDetailCardRepository,
  useCase = searchCardNamesUseCase,
}: CardScreenViewModelParams = {}) {
  const [firstCard, setFirstCard] = useState<CardEntity | null>(null);
  const [secondCard, setSecondCard] = useState<CardEntity | null>(null);
  const [selectedCard, setSelectedCard] =
    useState<SearchCardSuggestionEntity | null>(null);
  const [cardNames, setCardNames] = useState<SearchCardSuggestionEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorSearchMessage, setErrorSearchMessage] = useState<string | null>(
    null,
  );

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

  return {
    // Actions
    getDetailFirstCard,
    getDetailSecondCard,
    searchCardNames,
    setSelectedCard,

    // Data
    firstCard,
    secondCard,
    selectedCard,
    cardNames,

    // Loading & error state
    isLoading,
    isLoadingSearch,
    errorMessage,
    errorSearchMessage,
  };
}
