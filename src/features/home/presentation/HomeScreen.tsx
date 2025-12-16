import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../../App';
import { EmptyState } from '../../../common/components/EmptyState';
import { ErrorMessage } from '../../../common/components/ErrorMessage';
import { SearchBar } from '../../../common/components/SearchBar';
import { formatTimeAgo } from '../../../common/utils/time';
import { CompareCardsPreviewEntity } from '../domaine/entities/CompareCardsPreviewEntity';
import { SearchCardSuggestionEntity } from '../domaine/entities/SearchCardSuggestionEntity';
import { CompareCardsItem } from './components/CompareCardsItem';
import { CompareCardsSkeleton } from './components/CompareCardsSkeleton';
import { useStyles } from './styles/homeScreen.styles';
import { useHomeScreenViewModel } from './useHomeScreenViewModel';

type HomeScreenProp = RouteProp<RootStackParamList, 'Home'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { styles } = useStyles(insets.top);
  const viewModel = useHomeScreenViewModel();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<HomeScreenProp>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    compareCards,
    errorMessage,
    errorSearchMessage,
    isLoading,
    isLoadingSearch,
    cardNames,
    searchCardNames,
    getCompareCards,
  } = viewModel;

  useEffect(() => {
    if (route.params) {
      if (route.params.isReloadData) {
        getCompareCards();
        navigation.setParams({ isReloadData: false });
      }
    }
  }, [route.params, getCompareCards, navigation]);

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
    <SafeAreaView style={styles.container} edges={['top']}>
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
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchQuery}
          onClear={handleClearSearch}
          suggestions={cardNames}
          onSuggestionPress={handleSuggestionPress}
          enableSuggestions={true}
          isLoading={isLoadingSearch}
          errorMessage={errorSearchMessage}
        />
      </Animated.View>

      {/* Card List */}
      {errorMessage ? (
        <ErrorMessage message={errorMessage} onRetry={getCompareCards} />
      ) : isLoading ? (
        <CompareCardsSkeleton />
      ) : compareCards.length === 0 ? (
        <EmptyState
          message={
            searchQuery
              ? `No cards found for "${searchQuery}"`
              : 'No card comparisons yet'
          }
          emoji="🎴"
        />
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
            data={compareCards}
            renderItem={renderCardItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
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
}
