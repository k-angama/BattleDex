import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { EmptyState } from '../../../../common/components/EmptyState';
import { ErrorMessage } from '../../../../common/components/ErrorMessage';
import {
  collectionGroupStore,
  CollectionGroupStore,
} from '../../../../common/services/CollectionGroupStore';
import { useTheme } from '../../../../common/styles';
import { CollectionGroupCard } from './components/CollectionGroupCard';
import { CollectionGroupCardSkeleton } from './components/CollectionGroupCardSkeleton';
import { useStyles } from './styles/collectionGroupScreen.styles';
import { useCollectionGroupScreenViewModel } from './useCollectionGroupScreenViewModel';

interface CollectionGroupScreenParams {
  store?: CollectionGroupStore;
}

const CollectionGroupScreen = observer(
  ({ store = collectionGroupStore }: CollectionGroupScreenParams = {}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { theme } = useTheme();
    const { styles } = useStyles();
    const { collections, isLoading, errorMessage, getCollections } =
      useCollectionGroupScreenViewModel();
    const storeCollections = store.collections;

    useEffect(() => {
      store.setCollections(collections);
    }, [collections, store]);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name="plus-circle"
            size={28}
            color={theme.colors.primary}
            onPress={() => {
              // TODO: Add collection logic
              console.log('Add new collection');
            }}
          />
        ),
      });
    }, [navigation, theme.colors.primary]);

    return (
      <SafeAreaView style={styles.container} edges={[]}>
        {errorMessage ? (
          <ErrorMessage message={errorMessage} onRetry={getCollections} />
        ) : isLoading ? (
          <CollectionGroupCardSkeleton />
        ) : storeCollections.length === 0 ? (
          <EmptyState message="No collections yet" emoji="📂" />
        ) : (
          <FlatList
            data={storeCollections}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => <CollectionGroupCard item={item} />}
            contentContainerStyle={styles.listContent}
            scrollEnabled={true}
          />
        )}
      </SafeAreaView>
    );
  },
);

export default CollectionGroupScreen;
