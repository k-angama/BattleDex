import { pcPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { isMockDataSource } from '../../../common/utils/environment';
import { GetDetailCardRepositoryImpl } from '../data/GetDetailCardRepositoryImpl';
import { GetDetailCardMockRepository } from '../domain/mocks/GetDetailCardMockRepository';

const useMocks = isMockDataSource();

const createGetDetailRepository = () =>
  useMocks
    ? new GetDetailCardMockRepository()
    : new GetDetailCardRepositoryImpl(pcPowerScoreAPI);

export const getDetailCardRepository = createGetDetailRepository();
