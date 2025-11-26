import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Animated, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../../App';
import { ErrorMessage } from '../../../common/components/ErrorMessage';
import { Skeleton } from '../../../common/components/Skeleton';
import { useStyles } from './styles/compareScreen.style';
import { useCompareScreenViewModel } from './useCompareScreenViewModel';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CompareScreenProp = RouteProp<RootStackParamList, 'Compare'>;

export function CompareScreen() {
  const styles = useStyles();
  const { compareCards, result, isLoading, errorMessage } =
    useCompareScreenViewModel();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CompareScreenProp>();
  const { firstCard, secondCard, isDataLocal } = route.params;
  const leftCardScale = React.useRef(new Animated.Value(1)).current;
  const rightCardScale = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    compareCards(firstCard, secondCard, isDataLocal);
  }, [compareCards, firstCard, secondCard, isDataLocal]);

  useEffect(() => {
    if (!isLoading) {
      leftCardScale.setValue(2.15);
      rightCardScale.setValue(2.2);
      Animated.stagger(120, [
        Animated.spring(leftCardScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
          tension: 140,
        }),
        Animated.spring(rightCardScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
          tension: 140,
        }),
      ]).start();
    }
  }, [isLoading, leftCardScale, rightCardScale]);

  useEffect(() => {
    return () => {
      if (!isDataLocal) navigation.popTo('Home', { isReloadData: true });
    };
  }, [isDataLocal, navigation]);

  const winnerDetail = result?.winnerCard.detail ?? firstCard;
  const loserDetail =
    result?.loserCard.detail ??
    (winnerDetail.id === firstCard.id ? secondCard : firstCard);
  const winnerStats = result?.winnerCard;
  const loserStats = result?.loserCard;

  const winnerDisplay = winnerDetail;
  const loserDisplay = loserDetail;

  const statRows = [
    { label: 'HP', v1: loserDetail.hp, v2: winnerDetail.hp },
    {
      label: 'Damage',
      v1: loserDetail.attacks?.[0]?.damage ?? 0,
      v2: winnerDetail.attacks?.[0]?.damage ?? 0,
    },
    {
      label: 'Energy',
      v1: loserDetail.attacks?.[0]?.energyCost ?? 0,
      v2: winnerDetail.attacks?.[0]?.energyCost ?? 0,
    },
  ];

  // --- Shared row renderer ---
  const renderStatRow = (label: string, v1: number, v2: number) => {
    const c1 = v1 > v2;
    const c2 = v2 > v1;

    return (
      <View style={styles.statRow} key={label}>
        <View style={[styles.statCell, c1 && styles.winnerCell]}>
          <Text style={[styles.statValue, c1 && styles.winnerText]}>{v1}</Text>
        </View>

        <View style={styles.statLabel}>
          <Text style={styles.statLabelText}>{label}</Text>
        </View>

        <View style={[styles.statCell, c2 && styles.winnerCell]}>
          <Text style={[styles.statValue, c2 && styles.winnerText]}>{v2}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading && (
          <>
            <Text style={styles.statusText}>Calculating comparison...</Text>
            <LottieView
              source={require('../../../../assets/animations/red-lightning.json')}
              style={styles.loaderAnimation}
              autoPlay
              loop
            />
          </>
        )}
        {errorMessage ? (
          <>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <ErrorMessage
              message={errorMessage}
              onRetry={() => {
                navigation.pop();
              }}
            />
          </>
        ) : (
          <>
            {/* ========== ARENA (Cards + VS) ========== */}
            {!isLoading && (
              <View style={styles.battleArena}>
                {/* Loser Card */}
                <Animated.View
                  style={[
                    styles.cardWrapper,
                    styles.cardLeft,
                    {
                      transform: [
                        { rotate: '-15deg' },
                        { scale: leftCardScale },
                      ],
                    },
                  ]}
                >
                  <View style={styles.card}>
                    <Image
                      source={{ uri: loserDisplay.imageUrl ?? '' }}
                      style={styles.cardImage}
                    />
                  </View>

                  <Text style={styles.cardName}>{loserDisplay.name}</Text>

                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreLabel}>Power Score</Text>
                    <Text style={styles.scoreValue}>
                      {(loserStats?.score ?? 0).toFixed(1)}
                    </Text>
                  </View>
                </Animated.View>

                {/* Winner Card */}
                <Animated.View
                  style={[
                    styles.cardWrapper,
                    styles.cardRight,
                    {
                      transform: [
                        { rotate: '15deg' },
                        { scale: rightCardScale },
                      ],
                    },
                  ]}
                >
                  <View style={styles.card}>
                    <Image
                      source={{ uri: winnerDisplay.imageUrl ?? '' }}
                      style={styles.cardImage}
                    />
                  </View>
                  <Text style={styles.cardNameWinner}>
                    {winnerDisplay.name}
                  </Text>

                  <View style={styles.scoreBoxWinner}>
                    <Text style={styles.scoreLabelWinner}>Power Score</Text>
                    <Text style={styles.scoreValueWinner}>
                      {(winnerStats?.score ?? 0).toFixed(1)}
                    </Text>
                  </View>
                </Animated.View>

                {/* WINNERBadge */}
                <View style={styles.winTag}>
                  <Text style={styles.winTagText}>WINNER</Text>
                </View>

                {/* LOSE Badge */}
                <View style={styles.loseTag}>
                  <Text style={styles.loseTagText}>LOSE</Text>
                </View>

                {/* VS Circular Badge */}
                <View style={styles.vsCircle}>
                  <Text style={styles.vsText}>VS</Text>
                </View>
              </View>
            )}
            {/* ========== POWER ANALYSIS SECTION ========== */}
            <Skeleton isLoading={isLoading}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Power Analysis</Text>

                <View style={styles.powerGrid}>
                  {/* Loser */}
                  <View style={styles.playerCol}>
                    <Text style={styles.playerName} numberOfLines={1}>
                      {loserDisplay.name}
                    </Text>

                    <View style={styles.powerCard}>
                      <Text style={styles.powerLabel}>Offensive Power</Text>
                      <Text style={styles.powerValue}>
                        {(loserStats?.offensivePower ?? 0).toFixed(1)}
                      </Text>
                    </View>

                    <View style={styles.powerCard}>
                      <Text style={styles.powerLabel}>Defensive Power</Text>
                      <Text style={styles.powerValue}>
                        {(loserStats?.defensivePower ?? 0).toFixed(1)}
                      </Text>
                    </View>
                  </View>

                  {/* Winner */}
                  <View style={styles.playerCol}>
                    <Text
                      style={[styles.playerName, styles.playerWinner]}
                      numberOfLines={1}
                    >
                      {winnerDisplay.name}
                    </Text>

                    <View style={[styles.powerCard, styles.powerCardWinner]}>
                      <Text style={styles.powerLabelWinner}>
                        Offensive Power
                      </Text>
                      <Text style={styles.powerValueWinner}>
                        {(winnerStats?.offensivePower ?? 0).toFixed(1)}
                      </Text>
                    </View>

                    <View style={[styles.powerCard, styles.powerCardWinner]}>
                      <Text style={styles.powerLabelWinner}>
                        Defensive Power
                      </Text>
                      <Text style={styles.powerValueWinner}>
                        {(winnerStats?.defensivePower ?? 0).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Skeleton>
            {/* ========== STATS TABLE ========== */}
            <Skeleton isLoading={isLoading}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Detailed Stats</Text>

                <View style={styles.statsTable}>
                  {/* Header */}
                  <View style={styles.statsHeader}>
                    <Text style={styles.headerCell}>{loserDisplay.name}</Text>
                    <Text style={styles.headerCellCenter}>Stat</Text>
                    <Text style={styles.headerCell}>{winnerDisplay.name}</Text>
                  </View>

                  {/* Rows */}
                  {!isLoading &&
                    statRows.map(row =>
                      renderStatRow(row.label, row.v1, row.v2),
                    )}

                  {/* Weakness (non numeric row) */}
                  <View style={styles.statRow}>
                    <View style={styles.statCell}>
                      <Text style={styles.statValue}>
                        {loserDisplay.weaknesses?.[0]
                          ? `${loserDisplay.weaknesses[0].type} ${loserDisplay.weaknesses[0].value}`
                          : 'N/A'}
                      </Text>
                    </View>

                    <View style={styles.statLabel}>
                      <Text style={styles.statLabelText}>Weakness</Text>
                    </View>

                    <View style={styles.statCell}>
                      <Text style={styles.statValue}>
                        {winnerDisplay.weaknesses?.[0]
                          ? `${winnerDisplay.weaknesses[0].type} ${winnerDisplay.weaknesses[0].value}`
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Skeleton>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
