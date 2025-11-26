import Config from 'react-native-config';

export type DataSourceMode = 'mock' | 'remote';

export const getDataSourceMode = (): DataSourceMode => {
  const normalized = Config.DATA_SOURCE?.toLowerCase?.();
  console.log('Data Source Mode:', Config.DATA_SOURCE);
  return normalized === 'mock' ? 'mock' : 'remote';
};

export const isMockDataSource = () => getDataSourceMode() === 'mock';
