import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Animated, Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../../App';
import { BDAttacksTypes } from '../../../common/components/BDAttacksTypes';
import { BDBadge } from '../../../common/components/BDBadge';
import { BDCard } from '../../../common/components/BDCard';
import { BDCircularBadge } from '../../../common/components/BDCircularBadge';
import { BDEnergieType } from '../../../common/components/BDEnergieTypes';
import { BDTypography } from '../../../common/components/BDTypography';
import { ErrorMessage } from '../../../common/components/ErrorMessage';
import { CompareScreenSkeleton } from './components/CompareScreenSkeleton';
import { StatsRow } from './components/StatsRow';
import { StatsTable } from './components/StatsTable';
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
  const loserDetail = result?.loserCard.detail ?? secondCard;
  const winnerStats = result?.winnerCard;
  const loserStats = result?.loserCard;
  const isDraw = result?.winner === 'draw';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading && <CompareScreenSkeleton />}
        {!isLoading && errorMessage ? (
          <>
            <BDTypography variant="label" style={styles.errorText}>
              {errorMessage}
            </BDTypography>
            <ErrorMessage
              message={errorMessage}
              onRetry={() => {
                navigation.pop();
              }}
            />
          </>
        ) : !isLoading ? (
          <>
            {/* ========== ARENA (Cards + VS) ========== */}
            <View style={styles.battleArena}>
              {/* Loser Card */}
              <Animated.View
                style={[
                  styles.cardWrapper,
                  styles.cardLeft,
                  {
                    transform: [
                      { rotate: !isDraw ? '-15deg' : '-5deg' },
                      { scale: leftCardScale },
                    ],
                  },
                ]}
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: loserDetail.imageUrl ?? '' }}
                    style={styles.cardImage}
                  />
                </View>
              </Animated.View>

              {/* Winner Card */}
              <Animated.View
                style={[
                  styles.cardWrapper,
                  styles.cardRight,
                  {
                    transform: [
                      { rotate: !isDraw ? '15deg' : '5deg' },
                      { scale: rightCardScale },
                    ],
                  },
                ]}
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: winnerDetail.imageUrl ?? '' }}
                    style={styles.cardImage}
                  />
                </View>
              </Animated.View>

              {/* Result Badge */}
              {isDraw ? (
                <BDBadge
                  style={styles.drawTag}
                  label="NO WINNER"
                  variant="info"
                />
              ) : (
                <>
                  <BDBadge
                    style={styles.winTag}
                    label="WINNER"
                    variant="winner"
                  />
                  <BDBadge
                    style={styles.loseTag}
                    label="LOSE"
                    variant="loser"
                  />
                </>
              )}

              {/* VS Circular Badge */}
              <BDCircularBadge style={styles.vsCircle} label="VS" />
            </View>
            {/* ========== POWER ANALYSIS SECTION ========== */}
            <View style={styles.containerNameTag}>
              <BDBadge
                style={styles.winNameTag}
                label={loserDetail.name}
                variant={!isDraw ? 'winner' : 'info'}
              />
              <BDBadge
                style={styles.loseNameTag}
                label={winnerDetail.name}
                variant={!isDraw ? 'loser' : 'info'}
              />
            </View>
            <BDCard
              style={styles.section}
              styleTitle={styles.sectionTitle}
              title="Power Analysis"
            >
              <StatsTable>
                <StatsRow
                  labelStart={loserStats?.powerScore ?? 0}
                  labelMiddle="Power Score"
                  labelEnd={winnerStats?.powerScore ?? 0}
                />
                <StatsRow
                  labelStart={loserStats?.staticPowerScore ?? 0}
                  labelMiddle="Static Score"
                  labelEnd={winnerStats?.staticPowerScore ?? 0}
                />
                <StatsRow
                  labelStart={loserStats?.finalHp ?? 0}
                  labelMiddle="Final HP"
                  labelEnd={winnerStats?.finalHp ?? 0}
                />
                <StatsRow
                  labelStart={loserStats?.damageDealtp ?? 0}
                  labelMiddle="Damage dealt"
                  labelEnd={winnerStats?.damageDealtp ?? 0}
                />
              </StatsTable>
            </BDCard>
            {/* ========== STATS TABLE ========== */}
            <BDCard
              style={styles.section}
              styleTitle={styles.sectionTitle}
              title="Detailed Stats"
            >
              <StatsTable>
                <StatsRow
                  labelStart={
                    <BDAttacksTypes attacks={loserDetail.attacks ?? []} />
                  }
                  labelMiddle="Energy cost"
                  labelEnd={
                    <BDAttacksTypes attacks={winnerDetail.attacks ?? []} />
                  }
                />
                <StatsRow
                  labelStart={
                    <BDEnergieType type={loserDetail.resistances ?? []} />
                  }
                  labelMiddle="resistances"
                  labelEnd={
                    <BDEnergieType type={winnerDetail.resistances ?? []} />
                  }
                />
                <StatsRow
                  labelStart={
                    <BDEnergieType type={loserDetail.weaknesses ?? []} />
                  }
                  labelMiddle="Weakness"
                  labelEnd={
                    <BDEnergieType type={winnerDetail.weaknesses ?? []} />
                  }
                />
              </StatsTable>
            </BDCard>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
