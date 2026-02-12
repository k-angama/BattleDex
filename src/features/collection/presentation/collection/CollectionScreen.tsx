import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BDToast, BDToastHandle } from '../../../../common/components/BDToast';
import { EmptyState } from '../../../../common/components/EmptyState';
import { ErrorMessage } from '../../../../common/components/ErrorMessage';
import {
  collectionCardStore,
  CollectionCardStore,
} from '../../../../common/services/CollectionCardStore';
import { collectionGroupStore } from '../../../../common/services/CollectionGroupStore';
import {
  CollectionGroupStackParamList,
  RootStackParamList,
} from '../../../navigation/presentation/NavigationScreen';
import { CollectionCardEntity } from '../../domaine/entities/CollectionCardEntity';
import { CollectionCard } from './components/CollectionCard';
import { CollectionCardSkeleton } from './components/CollectionCardSkeleton';
import { useStyles } from './styles/collectionScreen.styles';
import { useCollectionScreenViewModel } from './useCollectionScreenViewModel';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<CollectionGroupStackParamList, 'Collection'>,
  NativeStackNavigationProp<RootStackParamList>
>;
type CollectionScreenRouteProp = RouteProp<
  CollectionGroupStackParamList,
  'Collection'
>;

interface CollectionScreenParams {
  store?: CollectionCardStore;
}

const CollectionScreen = observer(
  ({ store = collectionCardStore }: CollectionScreenParams = {}) => {
    const route = useRoute<CollectionScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { styles } = useStyles();
    const { cards, isLoading, errorMessage, getCards, removeCard } =
      useCollectionScreenViewModel();
    const toastRef = useRef<BDToastHandle>(null);
    const storeCards = store.cards;

    const collectionName = route.params?.collectionName || 'Collection';
    const collectionGroupId = route.params?.collectionGroupId || '';

    useEffect(() => {
      store.setCards(cards);
    }, [cards, store]);

    useLayoutEffect(() => {
      navigation.setOptions({
        title: collectionName,
      });
    }, [navigation, collectionName]);

    useEffect(() => {
      getCards(collectionGroupId);
    }, [getCards, collectionGroupId]);

    const handleOpenCard = useCallback(
      (card: CollectionCardEntity) => {
        navigation.navigate('Card', {
          cardId: card.id,
          name: card.title,
        });
      },
      [navigation],
    );

    const handleDeleteCard = useCallback(
      async (card: CollectionCardEntity) => {
        const result = await removeCard(collectionGroupId, card.id);
        if (result.success) {
          store.removeCard(card.id);
          collectionGroupStore.removeCardCountFromCollection(
            collectionGroupId,
            1,
          );
          toastRef.current?.show({
            message: 'Card removed successfully',
            type: 'success',
          });
        } else {
          Alert.alert(
            'Error',
            result.error ?? 'Unable to remove card. Please try again.',
          );
        }
      },
      [removeCard, collectionGroupId, store],
    );

    return (
      <SafeAreaView style={styles.container} edges={[]}>
        {errorMessage ? (
          <ErrorMessage
            message={errorMessage}
            onRetry={() => getCards(collectionGroupId)}
          />
        ) : isLoading ? (
          <CollectionCardSkeleton />
        ) : storeCards.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <EmptyState message="No cards in this collection" emoji="🎴" />
          </View>
        ) : (
          <FlatList
            data={storeCards}
            renderItem={({ item, index }) => (
              <CollectionCard
                card={item}
                rank={index + 1}
                onPress={() => handleOpenCard(item)}
                onDelete={() => handleDeleteCard(item)}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
          />
        )}
        <BDToast ref={toastRef} />
      </SafeAreaView>
    );
  },
);

export default CollectionScreen;
