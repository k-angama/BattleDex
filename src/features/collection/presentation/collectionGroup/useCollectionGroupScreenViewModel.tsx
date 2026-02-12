import { useCallback, useEffect, useState } from 'react';
import { safeCall } from '../../../../common/utils/safeAsync';
import type { CollectionGroupEntity } from '../../domaine/entities/CollectionGroupEntity';
import type { CollectionGroupRepository } from '../../domaine/repositories/CollectionGroupRepository';
import { collectionGroupRepository } from './collectionGroupScreenDI';

interface CollectionGroupScreenViewModelParams {
  repository?: CollectionGroupRepository;
}

export function useCollectionGroupScreenViewModel({
  repository = collectionGroupRepository,
}: CollectionGroupScreenViewModelParams = {}) {
  const [collections, setCollections] = useState<CollectionGroupEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getCollections = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    await safeCall(
      () => repository.getCollections(),
      setCollections,
      setErrorMessage,
      {
        operation: 'Fetch Collections',
        fallbackMessage: 'Unable to fetch collections. Please try again.',
      },
    );

    setIsLoading(false);
  }, [repository]);

  const addCollection = useCallback(
    async (
      name: string,
      color: string,
    ): Promise<{
      success: boolean;
      error: string | null;
      createdCollection?: CollectionGroupEntity;
    }> => {
      setErrorMessage(null);

      const [createdCollection, error] = await safeCall(
        () => repository.addCollection(name, color),
        undefined,
        undefined,
        {
          operation: 'Add Collection',
          fallbackMessage: 'Unable to add collection. Please try again.',
        },
      );

      return {
        success: !error,
        error,
        createdCollection: createdCollection ?? undefined,
      };
    },
    [repository],
  );

  const updateCollection = useCallback(
    async (
      collection: CollectionGroupEntity,
    ): Promise<{ success: boolean; error: string | null }> => {
      setErrorMessage(null);

      const [, error] = await safeCall(
        () => repository.updateCollection(collection),
        undefined,
        undefined,
        {
          operation: 'Update Collection',
          fallbackMessage: 'Unable to update collection. Please try again.',
        },
      );

      return { success: !error, error };
    },
    [repository],
  );

  const removeCollection = useCallback(
    async (id: string): Promise<{ success: boolean; error: string | null }> => {
      setErrorMessage(null);

      const [, error] = await safeCall(
        () => repository.removeCollection(id),
        undefined,
        undefined,
        {
          operation: 'Remove Collection',
          fallbackMessage: 'Unable to remove collection. Please try again.',
        },
      );

      return { success: !error, error };
    },
    [repository],
  );

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return {
    // Data
    collections,

    // Actions
    getCollections,
    addCollection,
    updateCollection,
    removeCollection,

    // Loading & error state
    isLoading,
    errorMessage,
  };
}
