import { pcPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { isMockDataSource } from '../../../common/utils/environment';
import { AddToCollectionRepositoryImpl } from '../data/AddToCollectionRepositoryImpl';
import { GetDetailCardRepositoryImpl } from '../data/GetDetailCardRepositoryImpl';
import { AddToCollectionRepositoryMock } from '../domain/mocks/AddToCollectionRepositoryMock';
import { GetDetailCardMockRepository } from '../domain/mocks/GetDetailCardMockRepository';

const useMocks = isMockDataSource();

const createGetDetailRepository = () =>
  useMocks
    ? new GetDetailCardMockRepository()
    : new GetDetailCardRepositoryImpl(pcPowerScoreAPI);

const createAddToCollectionRepository = () =>
  useMocks
    ? new AddToCollectionRepositoryMock()
    : new AddToCollectionRepositoryImpl();

export const getDetailCardRepository = createGetDetailRepository();
export const addToCollectionRepository = createAddToCollectionRepository();
