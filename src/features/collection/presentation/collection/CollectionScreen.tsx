import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../../../common/components/EmptyState';
import { ErrorMessage } from '../../../../common/components/ErrorMessage';
import {
  collectionCardStore,
  CollectionCardStore,
} from '../../../../common/services/CollectionCardStore';
import { CollectionGroupStackParamList } from '../../../navigation/presentation/NavigationScreen';
import { CollectionCardEntity } from '../../domaine/entities/CollectionCardEntity';
import { CollectionCard } from './components/CollectionCard';
import { CollectionCardSkeleton } from './components/CollectionCardSkeleton';
import { useStyles } from './styles/collectionScreen.styles';
import { useCollectionScreenViewModel } from './useCollectionScreenViewModel';

type NavigationProp = NativeStackNavigationProp<CollectionGroupStackParamList>;
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
    const { cards, isLoading, errorMessage, getCards } =
      useCollectionScreenViewModel();
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
            renderItem={({ item }) => (
              <CollectionCard
                card={item}
                onPress={() => handleOpenCard(item)}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
          />
        )}
      </SafeAreaView>
    );
  },
);

export default CollectionScreen;
