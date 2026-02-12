import { useCallback, useEffect, useState } from 'react';
import { ThemeMode } from '../../../common/styles';
import type { CollectionGroupEntity } from '../../collection/domaine/entities/CollectionGroupEntity';
import { CollectionGroupRepository } from '../../collection/domaine/repositories/CollectionGroupRepository';
import { collectionGroupRepository } from '../../collection/presentation/collectionGroup/collectionGroupScreenDI';
import { SettingsRepository } from '../../settings/domaine/SettingsRepository';
import { settingsRepositoryImp } from '../../settings/presentation/settingsScreenDI';

interface NavigationScreenViewModelParams {
  settingsRepository?: SettingsRepository;
  collectionGroupRepository?: CollectionGroupRepository;
}

export function useNavigationScreenViewModel({
  settingsRepository = settingsRepositoryImp,
  collectionGroupRepository: collectionRepo = collectionGroupRepository,
}: NavigationScreenViewModelParams = {}) {
  const [themeMode] = useState<ThemeMode>(() => {
    return settingsRepository?.getThemeMode() ?? 'system';
  });
  const [collections, setCollections] = useState<CollectionGroupEntity[]>([]);

  // Load collections on app start
  const loadCollections = useCallback(async () => {
    try {
      const data = await collectionRepo.getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Failed to load collections:', error);
    }
  }, [collectionRepo]);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  return { themeMode, collections };
}
