import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Alert, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BDButton } from '../../../../common/components/BDButton';
import {
  BDToast,
  type BDToastHandle,
} from '../../../../common/components/BDToast';
import { AddCollectionGroupSheet } from '../../../../common/components/CollectionGroupAddSheet';
import { EmptyState } from '../../../../common/components/EmptyState';
import { ErrorMessage } from '../../../../common/components/ErrorMessage';
import {
  collectionGroupStore,
  CollectionGroupStore,
} from '../../../../common/services/CollectionGroupStore';
import { useTheme } from '../../../../common/styles';
import type { CollectionGroupEntity } from '../../domaine/entities/CollectionGroupEntity';
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
    const {
      collections,
      isLoading,
      errorMessage,
      getCollections,
      addCollection,
      updateCollection,
      removeCollection,
    } = useCollectionGroupScreenViewModel();
    const storeCollections = store.collections;
    const toastRef = useRef<BDToastHandle>(null);
    const [isAddSheetVisible, setIsAddSheetVisible] = useState(false);
    const [editingCollection, setEditingCollection] =
      useState<CollectionGroupEntity | null>(null);

    useEffect(() => {
      store.setCollections(collections);
    }, [collections, store]);

    const handlePressCard = useCallback(
      (item: CollectionGroupEntity) => {
        navigation.navigate('Collection', {
          collectionGroupId: item.id,
          collectionName: item.name,
        });
      },
      [navigation],
    );

    const handleEdit = useCallback((item: CollectionGroupEntity) => {
      setEditingCollection(item);
      setIsAddSheetVisible(true);
    }, []);

    const handleSubmit = useCallback(
      async (payload: { name: string; color: string }) => {
        if (editingCollection) {
          // Update existing collection
          const updatedCollection = {
            ...editingCollection,
            name: payload.name,
            color: payload.color,
          };
          const result = await updateCollection(updatedCollection);

          if (result.success) {
            setIsAddSheetVisible(false);
            setEditingCollection(null);
            store.updateCollection(updatedCollection);
            toastRef.current?.show({
              message: 'Collection updated successfully',
              type: 'success',
            });
          } else {
            Alert.alert(
              'Error',
              result.error ?? 'Unable to update collection. Please try again.',
            );
          }
        } else {
          // Create new collection
          const result = await addCollection(payload.name, payload.color);

          if (result.success && result.createdCollection) {
            setIsAddSheetVisible(false);
            store.addCollection(result.createdCollection);
            toastRef.current?.show({
              message: 'Collection created successfully',
              type: 'success',
            });
          } else {
            Alert.alert(
              'Error',
              result.error ?? 'Unable to add collection. Please try again.',
            );
          }
        }
      },
      [editingCollection, addCollection, updateCollection, store],
    );

    const handleCloseSheet = useCallback(() => {
      setIsAddSheetVisible(false);
      setEditingCollection(null);
    }, []);

    const handleDelete = useCallback(
      async (item: CollectionGroupEntity) => {
        Alert.alert(
          'Delete Collection',
          `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                const result = await removeCollection(item.id);
                if (result.success) {
                  store.removeCollection(item.id);
                  toastRef.current?.show({
                    message: 'Collection deleted successfully',
                    type: 'success',
                  });
                } else {
                  Alert.alert(
                    'Error',
                    result.error ??
                      'Unable to delete collection. Please try again.',
                  );
                }
              },
            },
          ],
          { cancelable: true },
        );
      },
      [removeCollection, store],
    );

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name="plus-circle"
            size={28}
            color={theme.colors.primary}
            onPress={() => {
              setIsAddSheetVisible(true);
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
          <View style={styles.emptyStateContainer}>
            <EmptyState message="No collections yet" emoji="📂" />
            <BDButton
              title="Create Collection"
              variant="text"
              size="lg"
              rightIcon={
                <Icon
                  name="plus-circle"
                  size={28}
                  color={theme.colors.primary}
                />
              }
              onPress={() => setIsAddSheetVisible(true)}
              style={styles.createButton}
            />
          </View>
        ) : (
          <FlatList
            data={storeCollections}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <CollectionGroupCard
                item={item}
                onPress={handlePressCard}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            contentContainerStyle={styles.listContent}
            scrollEnabled={true}
          />
        )}
        <AddCollectionGroupSheet
          visible={isAddSheetVisible}
          onClose={handleCloseSheet}
          onSubmit={handleSubmit}
          initialData={
            editingCollection
              ? { name: editingCollection.name, color: editingCollection.color }
              : undefined
          }
        />
        <BDToast ref={toastRef} />
      </SafeAreaView>
    );
  },
);

export default CollectionGroupScreen;
