import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../../../common/styles';
import { useStyles } from './styles/compareCardsSkeleton.style';

interface CompareCardsSkeletonProps {
  count?: number;
}

export function CompareCardsSkeleton({ count = 3 }: CompareCardsSkeletonProps) {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <SkeletonPlaceholder borderRadius={theme.radius.lg}>
      <View>
        {Array.from({ length: count }).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.timeBadge} />
            <View style={styles.row}>
              <View style={styles.cardColumn}>
                <View style={styles.cardImage} />
                <View style={styles.cardLine} />
              </View>
              <View style={styles.vsColumn}>
                <View style={styles.vsCircle} />
                <View style={styles.vsLine} />
              </View>
              <View style={styles.cardColumn}>
                <View style={styles.cardImage} />
                <View style={styles.cardLine} />
              </View>
            </View>
            <View style={styles.footerLine} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
}
