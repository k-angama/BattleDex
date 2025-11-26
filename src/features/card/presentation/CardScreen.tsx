import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../../App';
import { Skeleton } from '../../../common/components/Skeleton';
import { SearchCardSuggestionEntity } from '../../home/domaine/entities/SearchCardSuggestionEntity';
import { CardSelectorBottomSheet } from './components/CardSelectorBottomSheet';
import { DuelCard } from './components/DuelCard';
import { HolographicCard } from './components/HolographicCard';
import { useStyles } from './styles/cardScreen.styles';
import { useCardScreenViewModel } from './useCardScreenViewModel';

const getSizeCard = () => {
  const { width, height } = Dimensions.get('window');
  return {
    cardWith: height * 0.38,
    duelCardWith: width * 0.45,
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CardScreenRouteProp = RouteProp<RootStackParamList, 'Card'>;

export function CardScreen() {
  const styles = useStyles();
  const viewModel = useCardScreenViewModel();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CardScreenRouteProp>();
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);

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
  } = viewModel;

  useEffect(() => {
    const updateHeaderTitle = () => {
      navigation.setOptions({
        title:
          selectedCard && firstCard ? 'Ready to Battle' : route.params.name,
      });
    };
    updateHeaderTitle();
  }, [firstCard, navigation, route.params.name, selectedCard]);

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

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {/* Card Display Area */}
        <View style={styles.cardContainer}>
          {selectedCard && firstCard ? (
            <>
              <Text style={styles.cardSubtitle}>
                Preview the duel before launching the comparison
              </Text>
              <View style={styles.duelArena}>
                <DuelCard
                  side="left"
                  imageUrl={firstCard.imageUrl ?? ''}
                  name={firstCard.name}
                  subtitle={`HP ${firstCard.hp}`}
                  width={getSizeCard().duelCardWith}
                  isLoading={isLoading}
                />
                <View style={styles.vsBadge}>
                  <Text style={styles.vsBadgeText}>VS</Text>
                </View>
                <DuelCard
                  side="right"
                  imageUrl={selectedCard.imageUrl}
                  name={selectedCard.title}
                  subtitle={`HP ${secondCard?.hp}`}
                  width={getSizeCard().duelCardWith}
                  isLoading={isLoading}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.cardSubtitle}>Tilt and explore the card</Text>

              <HolographicCard
                imageUrl={firstCard?.imageUrl ?? ''}
                width={getSizeCard().cardWith}
                isLoading={isLoading}
              />

              <Skeleton isLoading={isLoading}>
                <View style={styles.infoContainer}>
                  <View style={styles.infoRow}>
                    <View style={styles.infoBadge}>
                      <Text style={styles.infoBadgeLabel}>HP</Text>
                      <Text style={styles.infoBadgeValue} numberOfLines={1}>
                        {firstCard?.hp.toString() ?? '-'}
                      </Text>
                    </View>
                    <View style={styles.infoBadge}>
                      <Text style={styles.infoBadgeLabel}>Type</Text>
                      <Text style={styles.infoBadgeValue} numberOfLines={1}>
                        {firstCard?.type ?? '-'}
                      </Text>
                    </View>
                    <View style={styles.infoBadge}>
                      <Text style={styles.infoBadgeLabel}>Rarity</Text>
                      <Text style={styles.infoBadgeValue} numberOfLines={1}>
                        {firstCard?.rarity ?? '-'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Skeleton>
            </>
          )}
        </View>

        {/* Compare Button */}
        <Skeleton isLoading={isLoading}>
          <View style={styles.actionContainer}>
            {!selectedCard && (
              <TouchableOpacity
                onPress={handleCompare}
                style={styles.compareButton}
                activeOpacity={0.8}
                disabled={errorMessage !== null}
              >
                <Text style={styles.compareButtonText}>
                  ⚔️ Compare with Another Card
                </Text>
              </TouchableOpacity>
            )}

            <Text style={styles.hintText}>
              {selectedCard
                ? 'Cards locked in. Ready to compare?'
                : 'Select another card to see the battle comparison'}
            </Text>

            {selectedCard && (
              <TouchableOpacity
                style={styles.changeOpponentButton}
                onPress={handleCompare}
                activeOpacity={0.7}
              >
                <Text style={styles.changeOpponentText}>Change opponent</Text>
              </TouchableOpacity>
            )}
            {selectedCard && (
              <TouchableOpacity
                style={styles.compareNowButton}
                onPress={handleCompareNow}
                activeOpacity={0.85}
              >
                <Text style={styles.compareNowText}>Compare Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </Skeleton>
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
    </SafeAreaView>
  );
}
