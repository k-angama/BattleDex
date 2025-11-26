import { pcPowerScoreAPI } from '../../../common/api/apiDI';
import { isMockDataSource } from '../../../common/utils/environment';
import { CompareCardsRepositoryImpl } from '../data/CompareCardsRepositoryImpl';
import { DBSaveCardRepositoryImpl } from '../data/DBSaveCardRepositoryImpl';
import { CompareCardsMockRepository } from '../domaine/mocks/CompareCardsMockRepository';
import { DBSaveCardMockRepository } from '../domaine/mocks/DBSaveCardMockRepository';

const useMocks = isMockDataSource();

const createCompareCardsRepository = () =>
  useMocks
    ? new CompareCardsMockRepository()
    : new CompareCardsRepositoryImpl(pcPowerScoreAPI);

const createDbSaveCardRepository = () =>
  useMocks ? new DBSaveCardMockRepository() : new DBSaveCardRepositoryImpl();

export const compareCardsRepository = createCompareCardsRepository();
export const dbSaveCardRepository = createDbSaveCardRepository();
