import { collectionsLocalDatabase } from '../../../../common/db/CollectionsLocalDatabase';
import { isMockDataSource } from '../../../../common/utils/environment';
import { CollectionCardRepositoryImpl } from '../../data/CollectionCardRepositoryImpl';
import { CollectionCardRepositoryMock } from '../../domaine/mocks/CollectionCardRepositoryMock';

const useMocks = isMockDataSource();

const createRepository = () =>
  useMocks
    ? new CollectionCardRepositoryMock()
    : new CollectionCardRepositoryImpl(collectionsLocalDatabase);

export const collectionCardRepository = createRepository();
