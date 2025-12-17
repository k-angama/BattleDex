import { pcPowerScoreAPI } from '../../../common/api/PCPowerScoreAPI';
import { compareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
import { isMockDataSource } from '../../../common/utils/environment';
import { APICardsRepositoryImpl } from '../data/APICardsRepositoryImpl';
import { DataBaseCardsRepositoryImpl } from '../data/DataBaseCardsRepositoryImpl';
import { APICardsMockRepository } from '../domaine/mocks/APICardsMockRepository';
import { DataBaseCardsMockRepository } from '../domaine/mocks/DataBaseCardsMockRepository';
import { SearchCardNamesUseCase } from '../domaine/usecases/SearchCardNamesUseCase';

const useMocks = isMockDataSource();

const createDataBaseRepository = () =>
  useMocks
    ? new DataBaseCardsMockRepository()
    : new DataBaseCardsRepositoryImpl(compareLocalDatabase);

const createApiRepository = () =>
  useMocks
    ? new APICardsMockRepository()
    : new APICardsRepositoryImpl(pcPowerScoreAPI);

export const dataBaseCardsRepository = createDataBaseRepository();
const apICardsRepository = createApiRepository();

export const searchCardNamesUseCase = new SearchCardNamesUseCase(
  apICardsRepository,
);
