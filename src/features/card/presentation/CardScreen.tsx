import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BDAttacksTypes } from '../../../common/components/BDAttacksTypes';
import { BDBadge } from '../../../common/components/BDBadge';
import { BDButton } from '../../../common/components/BDButton';
import { BDCard } from '../../../common/components/BDCard';
import { BDCircularBadge } from '../../../common/components/BDCircularBadge';
import { BDEnergieType } from '../../../common/components/BDEnergieTypes';
import {
  BDToast,
  type BDToastHandle,
} from '../../../common/components/BDToast';
import { BDTypography } from '../../../common/components/BDTypography';
import { collectionCardStore } from '../../../common/services/CollectionCardStore';
import { collectionGroupStore } from '../../../common/services/CollectionGroupStore';
import { useTheme } from '../../../common/styles';
import { CollectionGroupAddSheet } from '../../collection/presentation/collectionGroup/components/CollectionGroupAddSheet';
import { StatsRow } from '../../compare/presensation/components/StatsRow';
import { StatsTable } from '../../compare/presensation/components/StatsTable';
import { SearchCardSuggestionEntity } from '../../home/domaine/entities/SearchCardSuggestionEntity';
import { RootStackParamList } from '../../navigation/presentation/NavigationScreen';
import { ActionButtonsSkeleton } from './components/ActionButtonsSkeleton';
import { AddToCollectionBottomSheet } from './components/AddToCollectionBottomSheet';
import { CardScreenSkeleton } from './components/CardScreenSkeleton';
import { CardSelectorBottomSheet } from './components/CardSelectorBottomSheet';
import { DuelCard } from './components/DuelCard';
import { DuelCardsSkeleton } from './components/DuelCardsSkeleton';
import { HolographicCard } from './components/HolographicCard';
import { ScrollIndicator } from './components/ScrollIndicator';
import { useStyles } from './styles/cardScreen.styles';
import { useCardScreenViewModel } from './useCardScreenViewModel';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CardScreenRouteProp = RouteProp<RootStackParamList, 'Card'>;

export function CardScreen() {
  const styles = useStyles();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomInset = Platform.OS === 'ios' ? insets.bottom : 0;
  const actionTranslateY = useSharedValue<number>(0);
  const viewModel = useCardScreenViewModel();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CardScreenRouteProp>();
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [isAddToCollectionVisible, setIsAddToCollectionVisible] =
    useState(false);
  const [
    isCollectionGroupAddSheetVisible,
    setIsCollectionGroupAddSheetVisible,
  ] = useState(false);
  const [actionBarHeight, setActionBarHeight] = useState(0);
  const toastRef = useRef<BDToastHandle>(null);

  const {
    firstCard,
    secondCard,
    isLoading,
    isLoadingSearch,
    errorMessage,
    errorSearchMessage,
    getDetailFirstCard,
    getDetailSecondCard,
    cardNames,
    searchCardNames,
    setSelectedCard,
    selectedCard,
    checkIfCardInCollection,
    addCardToCollection,
    createCollection,
    isLoadingCollection,
  } = viewModel;

  const renderItemHeader = useCallback(
    (tintColor: string | undefined) => {
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={tintColor} />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const renderHeaderRight = useCallback(
    (tintColor: string | undefined) => {
      // Only show + button in single card view (not in duel mode)
      if (selectedCard) return null;

      return (
        <TouchableOpacity
          style={styles.headerRightButton}
          onPress={() => setIsAddToCollectionVisible(true)}
        >
          <Icon name="folder-plus-outline" size={24} color={tintColor} />
        </TouchableOpacity>
      );
    },
    [selectedCard, styles],
  );

  useEffect(() => {
    const updateHeaderTitle = () => {
      navigation.setOptions({
        title:
          selectedCard && firstCard ? 'Ready to Battle' : route.params.name,
        headerLeft: ({ tintColor }) => renderItemHeader(tintColor),
        headerRight: ({ tintColor }) => renderHeaderRight(tintColor),
      });
    };
    updateHeaderTitle();
  }, [
    firstCard,
    navigation,
    renderItemHeader,
    renderHeaderRight,
    route.params.name,
    selectedCard,
  ]);

  useEffect(() => {
    const getCard = async () => {
      getDetailFirstCard(route.params.cardId);
    };

    getCard();
  }, [getDetailFirstCard, route.params]);

  useEffect(() => {
    const getCard = async () => {
      if (!selectedCard) return;
      getDetailSecondCard(selectedCard.id);
    };
    getCard();
  }, [getDetailSecondCard, selectedCard]);

  const handleCompare = () => {
    setIsSelectorVisible(true);
  };

  const handleCardSelection = (cardToCompare: SearchCardSuggestionEntity) => {
    setSelectedCard(cardToCompare);
    setIsSelectorVisible(false);
  };

  const handleCloseSelector = () => {
    setIsSelectorVisible(false);
    searchCardNames('');
  };

  const handleCloseAddToCollection = () => {
    setIsAddToCollectionVisible(false);
  };

  const handleSelectCollection = async (collectionId: string) => {
    if (!firstCard) {
      return;
    }

    // Check if card already exists in collection
    /*const isCardAlreadyInCollection = await checkIfCardInCollection(
      firstCard.id,
      collectionId,
    );

    if (isCardAlreadyInCollection) {
      const collection = collectionGroupStore.collections.find(
        c => c.id === collectionId,
      );
      const collectionName = collection?.name || 'Collection';

      toastRef.current?.show({
        message: `Card already in ${collectionName}`,
        type: 'info',
      });
      return;
    }*/

    // Add card to collection
    const result = await addCardToCollection(firstCard, collectionId);

    if (result.success && result.addedCard) {
      collectionCardStore.addCard(result.addedCard);
      collectionGroupStore.addCardCountToCollection(collectionId, 1);
      const collection = collectionGroupStore.findCollectionById(collectionId);
      const collectionName = collection?.name || 'Collection';

      toastRef.current?.show({
        message: `Added to ${collectionName}`,
        type: 'success',
      });

      setIsAddToCollectionVisible(false);
    } else {
      toastRef.current?.show({
        message: result.error || 'Failed to add card to collection',
        type: 'error',
      });
    }
  };

  const handleCreateCollection = () => {
    setIsAddToCollectionVisible(false);
    setIsCollectionGroupAddSheetVisible(true);
  };

  const handleCloseCollectionGroupAddSheet = () => {
    setIsCollectionGroupAddSheetVisible(false);
  };

  const handleCollectionCreated = async (payload: {
    name: string;
    color: string;
  }) => {
    if (!firstCard) {
      return;
    }

    // Create the collection using ViewModel
    const result = await createCollection(payload.name, payload.color);

    if (result.success && result.createdCollection) {
      // Update store with new collection
      collectionGroupStore.addCollection(result.createdCollection);

      // Auto-add current card to new collection
      const addCardResult = await addCardToCollection(
        firstCard,
        result.createdCollection.id,
      );

      setIsCollectionGroupAddSheetVisible(false);

      if (addCardResult.success && addCardResult.addedCard) {
        collectionCardStore.addCard(addCardResult.addedCard);
        collectionGroupStore.addCardCountToCollection(
          result.createdCollection.id,
          1,
        );

        toastRef.current?.show({
          message: `Collection created and card added to ${payload.name}`,
          type: 'success',
        });
      } else {
        // Collection created but card add failed
        toastRef.current?.show({
          message: `Collection created but failed to add card`,
          type: 'error',
        });
      }
    } else {
      toastRef.current?.show({
        message: result.error || 'Failed to create collection',
        type: 'error',
      });
    }
  };

  const handleCompareNow = () => {
    if (!firstCard || !secondCard) {
      return;
    }
    navigation.replace('Compare', {
      firstCard: firstCard,
      secondCard: secondCard,
      isDataLocal: false,
    });
  };

  useEffect(() => {
    const createTwoButtonAlert = () =>
      Alert.alert('Card error', 'Unable to fetch card. Please try again.', [
        {
          text: 'Cancel',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {
          text: 'Retry',
          onPress: () => getDetailFirstCard(route.params.cardId),
        },
      ]);
    if (errorMessage?.length) createTwoButtonAlert();
  }, [errorMessage, getDetailFirstCard, navigation, route.params.cardId]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      const y = e.contentOffset.y;
      const h = e.layoutMeasurement.height;
      const contentH = e.contentSize.height;
      if (contentH <= h + 20) {
        actionTranslateY.value = 0;
        return;
      }
      const isNearBottom = y + h >= contentH - 50;

      // Show at bottom (0), hide at top (100)
      const to = isNearBottom ? 220 : 0;
      actionTranslateY.value = withTiming(to, { duration: 220 });
    },
  });

  const actionsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: actionTranslateY.value }],
  }));

  const getSizeCard = () => {
    const { width, height } = Dimensions.get('window');
    return {
      cardWith: height * 0.38,
      duelCardWith: width * 0.45,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Card Display Area */}
        <View style={styles.cardContainer}>
          <Animated.ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom: theme.spacing.lg + actionBarHeight + bottomInset,
              },
            ]}
            scrollEventThrottle={16}
            onScroll={onScroll}
            showsVerticalScrollIndicator
          >
            {selectedCard && firstCard ? (
              <>
                {isLoading ? (
                  <DuelCardsSkeleton
                    duelCardWidth={getSizeCard().duelCardWith}
                  />
                ) : (
                  <>
                    <View style={styles.duelArena}>
                      <DuelCard
                        side="left"
                        imageUrl={firstCard.imageUrl ?? ''}
                        width={getSizeCard().duelCardWith}
                      />
                      <BDCircularBadge variant="normal" label="VS" />
                      <DuelCard
                        side="right"
                        imageUrl={selectedCard.imageUrl}
                        width={getSizeCard().duelCardWith}
                      />
                    </View>
                    <View style={styles.containerNameTag}>
                      <BDBadge
                        style={styles.nameTag}
                        label={firstCard.name}
                        variant="info"
                      />
                      <BDBadge
                        style={styles.nameTag}
                        label={secondCard?.name ?? '-'}
                        variant="info"
                      />
                    </View>
                    <StatsTable>
                      {/* Rows */}
                      <StatsRow
                        labelStart={`HP ${firstCard.hp}`}
                        labelMiddle="Energy cost"
                        labelEnd={`HP ${secondCard?.hp}`}
                      />
                      <StatsRow
                        labelStart={
                          <BDEnergieType type={firstCard.resistances ?? []} />
                        }
                        labelMiddle="resistances"
                        labelEnd={
                          <BDEnergieType type={secondCard?.resistances ?? []} />
                        }
                      />
                      {/* Weakness (non numeric row) */}

                      <StatsRow
                        labelStart={
                          <BDEnergieType type={firstCard.weaknesses ?? []} />
                        }
                        labelMiddle="Weakness"
                        labelEnd={
                          <BDEnergieType type={secondCard?.weaknesses ?? []} />
                        }
                      />

                      <StatsRow
                        labelStart={
                          <BDAttacksTypes attacks={firstCard.attacks ?? []} />
                        }
                        labelMiddle="Energy cost"
                        labelEnd={
                          <BDAttacksTypes attacks={secondCard?.attacks ?? []} />
                        }
                      />
                    </StatsTable>
                  </>
                )}
              </>
            ) : (
              <>
                {isLoading ? (
                  <CardScreenSkeleton cardWidth={getSizeCard().cardWith} />
                ) : (
                  <>
                    <HolographicCard
                      imageUrl={firstCard?.imageUrl ?? ''}
                      width={getSizeCard().cardWith}
                    />

                    <ScrollIndicator />

                    <BDCard style={styles.containerInfo} title="Information">
                      <BDTypography variant="label">
                        {firstCard?.setName ?? '-'}
                      </BDTypography>
                      <BDTypography variant="label">
                        {firstCard?.hp.toString() ?? '-'} HP
                      </BDTypography>
                      <BDTypography variant="label">
                        🔥 {firstCard?.type ?? '-'} type Card
                      </BDTypography>
                    </BDCard>

                    <BDCard title="Attacks">
                      <BDTypography variant="body" weight="semibold">
                        <BDAttacksTypes
                          diplay="row"
                          attacks={firstCard?.attacks ?? []}
                        />
                      </BDTypography>
                    </BDCard>

                    <BDCard style={styles.containerLastInfo}>
                      <View>
                        <BDTypography variant="caption" weight="semibold">
                          Resistances
                        </BDTypography>
                        <BDEnergieType type={firstCard?.resistances ?? []} />
                      </View>
                      <View>
                        <BDTypography variant="caption" weight="semibold">
                          Weaknesses
                        </BDTypography>
                        <BDEnergieType type={firstCard?.weaknesses ?? []} />
                      </View>
                    </BDCard>
                  </>
                )}
              </>
            )}
          </Animated.ScrollView>
        </View>

        {/* Compare Button */}
        {isLoading ? (
          <ActionButtonsSkeleton />
        ) : (
          <Animated.View style={[styles.actionContainer, actionsAnimatedStyle]}>
            <SafeAreaView
              style={styles.container}
              edges={['bottom']}
              onLayout={event => {
                setActionBarHeight(event.nativeEvent.layout.height);
              }}
            >
              {!selectedCard && (
                <BDButton
                  title="⚔️ Compare with Another Card"
                  onPress={handleCompare}
                  disabled={errorMessage !== null}
                />
              )}

              <BDTypography variant="label" style={styles.hintText}>
                {selectedCard
                  ? 'Cards locked in. Ready to compare?'
                  : 'Select another card to see the battle comparison'}
              </BDTypography>

              {selectedCard && (
                <BDButton
                  title="Change opponent"
                  variant="text"
                  size="sm"
                  onPress={handleCompare}
                  style={styles.changeOpponentButton}
                />
              )}
              {selectedCard && (
                <BDButton
                  title="Compare Now"
                  variant="secondary"
                  onPress={handleCompareNow}
                />
              )}
            </SafeAreaView>
          </Animated.View>
        )}
      </View>
      <CardSelectorBottomSheet
        visible={isSelectorVisible}
        cards={cardNames}
        onClose={handleCloseSelector}
        onSelect={handleCardSelection}
        onChangeText={searchCardNames}
        isLoading={isLoadingSearch}
        errorMessage={errorSearchMessage}
      />
      <AddToCollectionBottomSheet
        visible={isAddToCollectionVisible}
        cardId={route.params.cardId}
        isLoading={isLoadingCollection}
        onClose={handleCloseAddToCollection}
        onSelectCollection={handleSelectCollection}
        onCreateCollection={handleCreateCollection}
        checkIfCardInCollection={checkIfCardInCollection}
      />
      <CollectionGroupAddSheet
        visible={isCollectionGroupAddSheetVisible}
        onClose={handleCloseCollectionGroupAddSheet}
        onSubmit={handleCollectionCreated}
      />
      <BDToast ref={toastRef} />
    </View>
  );
}
