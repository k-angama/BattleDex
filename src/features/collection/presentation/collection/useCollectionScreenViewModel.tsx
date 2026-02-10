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

  const addCard = useCallback(
    async (collectionId: string, card: CollectionCardEntity) => {
      setErrorMessage(null);
      await safeCall(
        () => repository.addCard(collectionId, card),
        undefined,
        setErrorMessage,
        { operation: 'Add Card', fallbackMessage: 'Failed to add card' },
      );
      if (!errorMessage) {
        await getCards(collectionId);
      }
    },
    [repository, getCards, errorMessage],
  );

  const removeCard = useCallback(
    async (collectionId: string, cardId: string) => {
      setErrorMessage(null);
      await safeCall(
        () => repository.removeCard(cardId),
        undefined,
        setErrorMessage,
        { operation: 'Remove Card', fallbackMessage: 'Failed to remove card' },
      );
      if (!errorMessage) {
        await getCards(collectionId);
      }
    },
    [repository, getCards, errorMessage],
  );

  return {
    cards,
    isLoading,
    errorMessage,
    getCards,
    addCard,
    removeCard,
  };
}
