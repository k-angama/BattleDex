import { pcPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { compareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
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
  useMocks
    ? new DBSaveCardMockRepository()
    : new DBSaveCardRepositoryImpl(compareLocalDatabase);

export const compareCardsRepository = createCompareCardsRepository();
export const dbSaveCardRepository = createDbSaveCardRepository();
