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
import { Alert, Animated, Keyboard, Platform } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BDButton } from '../../../common/components/BDButton';
import { BDHeaderButton } from '../../../common/components/BDHeaderButton';
import { BDTypography } from '../../../common/components/BDTypography';
import { EmptyState } from '../../../common/components/EmptyState';
import { ErrorMessage } from '../../../common/components/ErrorMessage';
import { SearchBar } from '../../../common/components/SearchBar';
import {
  compareCardsStore,
  CompareCardsStore,
} from '../../../common/services/CompareCardsStore';
import { formatTimeAgo } from '../../../common/utils/time';
import { HomeStackParamList } from '../../navigation/presentation/NavigationScreen';
import { CompareCardsPreviewEntity } from '../domaine/entities/CompareCardsPreviewEntity';
import { SearchCardSuggestionEntity } from '../domaine/entities/SearchCardSuggestionEntity';
import { CompareCardsItem } from './components/CompareCardsItem';
import { CompareCardsSkeleton } from './components/CompareCardsSkeleton';
import { useStyles } from './styles/homeScreen.styles';
import { useHomeScreenViewModel } from './useHomeScreenViewModel';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;
interface HomeScreenParams {
  store?: CompareCardsStore;
}

const HomeScreen = observer(
  ({ store = compareCardsStore }: HomeScreenParams = {}) => {
    const insets = useSafeAreaInsets();
    const { styles } = useStyles(insets.top);
    const viewModel = useHomeScreenViewModel();
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<NavigationProp>();
    const scrollY = useRef(new Animated.Value(0)).current;
    const compareCardsStoreData = store.compareCards;
    const {
      compareCards,
      errorMessage,
      errorSearchMessage,
      isLoading,
      isLoadingSearch,
      cardNames,
      selectedIds,
      searchCardNames,
      getCompareCards,
      deleteComparisons,
      deleteComparison,
      toggleSelectIds,
      clearSelectedIds,
    } = viewModel;
    const [isEditMode, setIsEditMode] = useState(false);
    const deleteBarOpacity = useSharedValue(0);
    const deleteBarTranslateY = useSharedValue(-20);
    const deleteBarHeight = useSharedValue(0);

    useEffect(() => {
      store.addCards(compareCards);
    }, [compareCards, store]);

    useEffect(() => {
      deleteBarOpacity.value = withTiming(isEditMode ? 1 : 0, {
        duration: 300,
      });
      deleteBarTranslateY.value = withTiming(isEditMode ? 0 : -20, {
        duration: 300,
      });
      deleteBarHeight.value = withTiming(isEditMode ? 60 : 0, {
        duration: 300,
      });
    }, [isEditMode, deleteBarOpacity, deleteBarTranslateY, deleteBarHeight]);

    const handleDeleteSelected = useCallback(async () => {
      if (selectedIds.length === 0) return;
      Alert.alert(
        'Delete selected',
        `Are you sure you want to delete ${
          selectedIds.length
        } selected comparison${selectedIds.length > 1 ? 's' : ''}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              const result = await deleteComparisons(selectedIds);
              if (result.success) {
                store.removeCards(selectedIds);
                clearSelectedIds();
                setIsEditMode(false);
              } else {
                Alert.alert(
                  'Error',
                  result.error ?? 'Unable to delete items. Please try again.',
                );
              }
            },
          },
        ],
      );
    }, [selectedIds, deleteComparisons, store, clearSelectedIds]);

    const handleClearSearch = useCallback(() => {
      setSearchQuery('');
      searchCardNames('');
    }, [searchCardNames]);

    const handleSearchQuery = useCallback(
      (query: string) => {
        setSearchQuery(query);
        searchCardNames(query);
      },
      [searchCardNames],
    );

    const handleSuggestionPress = useCallback(
      (suggestion: SearchCardSuggestionEntity) => {
        setSearchQuery('');
        navigation.navigate('Card', {
          cardId: suggestion.id,
          name: suggestion.title,
        });
      },
      [navigation],
    );

    const renderItemHeader = useCallback(() => {
      return (
        <BDHeaderButton
          disabled={compareCardsStoreData.length === 0}
          title={
            isEditMode && compareCardsStoreData.length > 0 ? 'Done' : 'Edit'
          }
          onPress={() => {
            Keyboard.dismiss();
            handleClearSearch();
            setIsEditMode(prev => !prev);
          }}
        />
      );
    }, [isEditMode, compareCardsStoreData.length, handleClearSearch]);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => renderItemHeader(),
      });
    }, [navigation, renderItemHeader]);

    const deleteBarAnimatedStyle = useAnimatedStyle(() => ({
      opacity: deleteBarOpacity.value,
      transform: [{ translateY: deleteBarTranslateY.value }],
      maxHeight: deleteBarHeight.value,
    }));

    const renderCardItem = ({ item }: { item: CompareCardsPreviewEntity }) => (
      <CompareCardsItem
        compareCards={item}
        timeAgo={formatTimeAgo(item.comparisonDate)}
        onPress={() => {
          navigation.navigate('Compare', {
            firstCard: item.loseCard,
            secondCard: item.windCard,
            isDataLocal: true,
          });
        }}
        isEditMode={isEditMode}
        selected={selectedIds.includes(item.id)}
        onToggleSelect={id => toggleSelectIds(id)}
        onDelete={id => {
          Alert.alert(
            'Delete comparison',
            'Are you sure you want to delete this comparison?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  const result = await deleteComparison(id);
                  if (result.success) {
                    store.removeCard(id);
                    clearSelectedIds();
                  } else {
                    Alert.alert(
                      'Error',
                      result.error ??
                        'Unable to delete item. Please try again.',
                    );
                  }
                },
              },
            ],
          );
        }}
      />
    );

    // Shadow opacity based on scroll position
    const shadowOpacity = scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, 0.15],
      extrapolate: 'clamp',
    });

    const shadowElevation = scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, 4],
      extrapolate: 'clamp',
    });

    const searchBarTranslateY =
      Platform.OS === 'ios'
        ? scrollY.interpolate({
            inputRange: [-500, 0, 80],
            outputRange: [500, 0, -insets.top],
            extrapolate: 'clamp',
          })
        : 0;

    // Animate the list to move up with the search bar
    const listTranslateY =
      Platform.OS === 'ios'
        ? scrollY.interpolate({
            inputRange: [0, 80],
            outputRange: [0, -insets.top],
            extrapolate: 'clamp',
          })
        : 0;

    // Animate the list height to expand when search bar moves up
    const listHeightIncrease =
      Platform.OS === 'ios'
        ? scrollY.interpolate({
            inputRange: [0, 80],
            outputRange: [0, -insets.top],
            extrapolate: 'clamp',
          })
        : 0;

    return (
      <SafeAreaView
        style={styles.container}
        edges={Platform.OS === 'ios' ? ['top'] : []}
      >
        {/* Search Bar with Animated Shadow */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              shadowOpacity,
              elevation: shadowElevation,
            },
            Platform.OS === 'ios' && {
              transform: [{ translateY: searchBarTranslateY }],
            },
          ]}
        >
          <SafeAreaView edges={Platform.OS === 'ios' ? ['top'] : []}>
            <SearchBar
              value={searchQuery}
              onChangeText={handleSearchQuery}
              onClear={handleClearSearch}
              suggestions={cardNames}
              onSuggestionPress={handleSuggestionPress}
              enableSuggestions={true}
              isLoading={isLoadingSearch}
              errorMessage={errorSearchMessage}
              onFocus={() => {
                setIsEditMode(false);
              }}
            />
          </SafeAreaView>
          {/* Delete Selected Bar */}
          <Reanimated.View style={[styles.deleteBar, deleteBarAnimatedStyle]}>
            <BDTypography variant="label" weight="semibold">
              {selectedIds.length} selected
            </BDTypography>
            <BDButton
              title="Delete"
              variant="primary"
              size="sm"
              disabled={selectedIds.length === 0}
              onPress={handleDeleteSelected}
            />
          </Reanimated.View>
        </Animated.View>

        {/* Card List */}
        {errorMessage ? (
          <ErrorMessage message={errorMessage} onRetry={getCompareCards} />
        ) : isLoading ? (
          <CompareCardsSkeleton />
        ) : compareCardsStoreData.length === 0 ? (
          <EmptyState message="No card comparisons yet" emoji="🎴" />
        ) : (
          <Animated.View
            style={[
              styles.list,
              Platform.OS === 'ios' && {
                transform: [{ translateY: listTranslateY }],
                marginBottom: listHeightIncrease,
              },
            ]}
          >
            <Animated.FlatList
              data={compareCardsStoreData}
              renderItem={renderCardItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              contentInsetAdjustmentBehavior="automatic"
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }, // Must be false for shadow/elevation
              )}
              scrollEventThrottle={16}
            />
          </Animated.View>
        )}
      </SafeAreaView>
    );
  },
);

export default HomeScreen;
