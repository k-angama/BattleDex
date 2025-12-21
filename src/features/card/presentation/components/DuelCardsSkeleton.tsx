import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useStyles } from './styles/duelCardsSkeleton.styles';

export type DuelCardsSkeletonProps = {
  duelCardWidth: number;
};

export function DuelCardsSkeleton({ duelCardWidth }: DuelCardsSkeletonProps) {
  const styles = useStyles();

  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        {/* Duel Arena */}
        <View style={styles.duelArena}>
          {/* Left Card */}
          <SkeletonPlaceholder.Item
            width={duelCardWidth}
            height={duelCardWidth * 1.4}
            borderRadius={12}
            style={styles.leftCard}
          />

          {/* VS Badge */}
          <SkeletonPlaceholder.Item
            width={60}
            height={60}
            borderRadius={30}
            style={styles.vsBadge}
          />

          {/* Right Card */}
          <SkeletonPlaceholder.Item
            width={duelCardWidth}
            height={duelCardWidth * 1.4}
            borderRadius={12}
            style={styles.rightCard}
          />
        </View>

        {/* Name Tags */}
        <View style={styles.nameTagsContainer}>
          <SkeletonPlaceholder.Item width="45%" height={32} borderRadius={16} />
          <SkeletonPlaceholder.Item width="45%" height={32} borderRadius={16} />
        </View>

        {/* Stats Table */}
        <View style={styles.statsTable}>
          <SkeletonPlaceholder.Item width="100%" height={56} borderRadius={8} />
          <SkeletonPlaceholder.Item width="100%" height={56} borderRadius={8} />
          <SkeletonPlaceholder.Item width="100%" height={56} borderRadius={8} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}
