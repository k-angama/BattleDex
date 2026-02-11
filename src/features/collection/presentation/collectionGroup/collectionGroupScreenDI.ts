import { isMockDataSource } from '../../../../common/utils/environment';
import { CollectionGroupRepositoryImpl } from '../../data/CollectionGroupRepositoryImpl';
import { CollectionGroupRepositoryMock } from '../../domaine/mocks/CollectionGroupRepositoryMock';

const useMocks = isMockDataSource();

const createRepository = () =>
  useMocks
    ? new CollectionGroupRepositoryMock()
    : new CollectionGroupRepositoryImpl();

export const collectionGroupRepository = createRepository();
