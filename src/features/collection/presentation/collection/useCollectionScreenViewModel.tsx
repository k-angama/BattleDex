import { useCallback, useState } from 'react';
import { safeCall } from '../../../../common/utils/safeAsync';
import type { CollectionCardEntity } from '../../domaine/entities/CollectionCardEntity';
import type { CollectionCardRepository } from '../../domaine/repositories/CollectionCardRepository';
import { collectionCardRepository } from './collectionScreenDI';

interface ViewModelParams {
  repository?: CollectionCardRepository;
}

export function useCollectionScreenViewModel({
  repository = collectionCardRepository,
}: ViewModelParams = {}) {
  const [cards, setCards] = useState<CollectionCardEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getCards = useCallback(
    async (collectionId: string) => {
      setIsLoading(true);
      setErrorMessage(null);
      await safeCall(
        () => repository.getCardsByCollectionId(collectionId),
        setCards,
        setErrorMessage,
        {
          operation: 'Fetch Collection Cards',
          fallbackMessage: 'Failed to load cards',
        },
      );
      setIsLoading(false);
    },
    [repository],
  );

  const removeCard = useCallback(
    async (cardId: string) => {
      const [, error] = await safeCall(
        () => repository.removeCard(cardId),
        undefined,
        undefined,
        { operation: 'Remove Card', fallbackMessage: 'Failed to remove card' },
      );

      if (!error) {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
      }

      return { success: !error, error };
    },
    [repository],
  );

  return {
    cards,
    isLoading,
    errorMessage,
    getCards,
    removeCard,
  };
}
