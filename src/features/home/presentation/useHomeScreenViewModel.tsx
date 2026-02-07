import { useCallback, useEffect, useState } from 'react';
import { safeCall } from '../../../common/utils/safeAsync';
import { DataBaseCardsRepository } from '../domaine/DataBaseCardsRepository';
import { CompareCardsPreviewEntity } from '../domaine/entities/CompareCardsPreviewEntity';
import { SearchCardSuggestionEntity } from '../domaine/entities/SearchCardSuggestionEntity';
import { SearchCardNamesUseCase } from '../domaine/usecases/SearchCardNamesUseCase';
import {
  dataBaseCardsRepository,
  searchCardNamesUseCase,
} from './homeScreenDI';

interface HomeScreenViewModelParams {
  dataBase?: DataBaseCardsRepository;
  useCase?: SearchCardNamesUseCase;
}

export function useHomeScreenViewModel({
  dataBase = dataBaseCardsRepository,
  useCase = searchCardNamesUseCase,
}: HomeScreenViewModelParams = {}) {
  const [compareCards, setCompareCards] = useState<CompareCardsPreviewEntity[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorSearchMessage, setErrorSearchMessage] = useState<string | null>(
    null,
  );
  const [cardNames, setCardNames] = useState<SearchCardSuggestionEntity[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const getCompareCards = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    await safeCall(
      () => dataBase.getCompareCards(),
      setCompareCards,
      setErrorMessage,
      {
        operation: 'Fetch Compare Cards',
        fallbackMessage: 'Unable to fetch cards. Please try again.',
      },
    );

    setIsLoading(false);
  }, [dataBase]);

  const deleteComparison = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setErrorMessage(null);

      await safeCall(
        () => dataBase.deleteComparison(id),
        undefined,
        setErrorMessage,
        {
          operation: 'Delete Comparison',
          fallbackMessage: 'Unable to delete comparison. Please try again.',
        },
      );

      setIsLoading(false);
    },
    [dataBase],
  );

  const deleteComparisons = useCallback(
    async (ids: string[]) => {
      if (!ids || ids.length === 0) return;
      setIsLoading(true);
      setErrorMessage(null);

      await safeCall(
        () => dataBase.deleteComparisons(ids),
        undefined,
        setErrorMessage,
        {
          operation: 'Bulk Delete Comparisons',
          fallbackMessage: 'Unable to delete comparisons. Please try again.',
        },
      );

      setIsLoading(false);
    },
    [dataBase],
  );

  useEffect(() => {
    getCompareCards();
  }, [dataBase, getCompareCards]);

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

  const toggleSelectIds = useCallback((id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
  }, []);

  const clearSelectedIds = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    // Data
    compareCards,
    cardNames,
    selectedIds,

    // Actions
    searchCardNames,
    getCompareCards,
    toggleSelectIds,
    clearSelectedIds,

    // Loading & error state
    isLoading,
    isLoadingSearch,
    errorMessage,
    errorSearchMessage,
    deleteComparison,
    deleteComparisons,
  };
}
