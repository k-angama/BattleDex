import { useCallback, useState } from 'react';
import { safeCall } from '../../../common/utils/safeAsync';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { CompareCardsPreviewEntity } from '../../home/domaine/entities/CompareCardsPreviewEntity';
import { CompareCardRepository } from '../domaine/CompareCardRepository';
import { DBSaveCardRepository } from '../domaine/DBSaveCardRepository';
import { MatchResultEntity } from '../domaine/entities/MatchResultEntity';
import {
  compareCardsRepository,
  dbSaveCardRepository,
} from './compareScreenDI';

interface CompareScreenViewModelParams {
  repository?: CompareCardRepository;
  dataBaseRepository?: DBSaveCardRepository;
}

export function useCompareScreenViewModel({
  repository = compareCardsRepository,
  dataBaseRepository = dbSaveCardRepository,
}: CompareScreenViewModelParams = {}) {
  const [compareCards, setCompareCards] =
    useState<CompareCardsPreviewEntity | null>(null);
  const [result, setResult] = useState<MatchResultEntity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const saveComparedCardToDB = useCallback(
    async (comparedCard: MatchResultEntity) => {
      await safeCall(
        () => dataBaseRepository.saveCardToDB(comparedCard),
        setCompareCards,
      );
    },
    [dataBaseRepository],
  );

  const onCompareCards = useCallback(
    async (cardOne: CardEntity, cardTwo: CardEntity, isDataLocal?: boolean) => {
      setIsLoading(true);
      setErrorMessage(null);

      const [cards, _] = await safeCall(
        () => repository.compareCards(cardOne, cardTwo),
        setResult,
        setErrorMessage,
        {
          operation: 'Compare Cards',
          fallbackMessage: 'Unable to compare cards. Please try again.',
        },
      );
      if (cards && !isDataLocal) {
        await saveComparedCardToDB(cards);
      }
      setIsLoading(false);
    },
    [repository, saveComparedCardToDB],
  );

  return {
    // Actions
    compareCards,

    // Data
    result,
    onCompareCards,

    // Loading & error state
    isLoading,
    errorMessage,
  };
}
