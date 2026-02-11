import { isMockDataSource } from '../../../../common/utils/environment';
import { CollectionCardRepositoryImpl } from '../../data/CollectionCardRepositoryImpl';
import { CollectionCardRepositoryMock } from '../../domaine/mocks/CollectionCardRepositoryMock';

const useMocks = isMockDataSource();

const createRepository = () =>
  useMocks
    ? new CollectionCardRepositoryMock()
    : new CollectionCardRepositoryImpl();

export const collectionCardRepository = createRepository();
