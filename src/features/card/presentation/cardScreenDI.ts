import { pcPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { collectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import { isMockDataSource } from '../../../common/utils/environment';
import { AddToCollectionRepositoryImpl } from '../data/AddToCollectionRepositoryImpl';
import { CreateCollectionRepositoryImpl } from '../data/CreateCollectionRepositoryImpl';
import { GetDetailCardRepositoryImpl } from '../data/GetDetailCardRepositoryImpl';
import { AddToCollectionRepositoryMock } from '../domain/mocks/AddToCollectionRepositoryMock';
import { CreateCollectionRepositoryMock } from '../domain/mocks/CreateCollectionRepositoryMock';
import { GetDetailCardMockRepository } from '../domain/mocks/GetDetailCardMockRepository';

const useMocks = isMockDataSource();

const createGetDetailRepository = () =>
  useMocks
    ? new GetDetailCardMockRepository()
    : new GetDetailCardRepositoryImpl(pcPowerScoreAPI);

const createAddToCollectionRepository = () =>
  useMocks
    ? new AddToCollectionRepositoryMock()
    : new AddToCollectionRepositoryImpl(collectionsLocalDatabase);

const createCreateCollectionRepository = () =>
  useMocks
    ? new CreateCollectionRepositoryMock()
    : new CreateCollectionRepositoryImpl(collectionsLocalDatabase);

export const getDetailCardRepository = createGetDetailRepository();
export const addToCollectionRepository = createAddToCollectionRepository();
export const createCollectionRepository = createCreateCollectionRepository();
