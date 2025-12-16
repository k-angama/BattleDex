import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useStyles } from '../styles/compareScreenSkeleton.styles';

export function CompareScreenSkeleton() {
  const styles = useStyles();

  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        {/* Title / status */}
        <SkeletonPlaceholder.Item width={200} height={18} borderRadius={8} />
        <SkeletonPlaceholder.Item
          width={160}
          height={16}
          borderRadius={8}
          style={styles.spacerSm}
        />

        {/* Arena cards and badges */}
        <View style={styles.battleArena}>
          <SkeletonPlaceholder.Item
            width={150}
            height={210}
            borderRadius={12}
            style={styles.leftCard}
          />
          <SkeletonPlaceholder.Item width={72} height={72} borderRadius={36} />
          <SkeletonPlaceholder.Item
            width={150}
            height={210}
            borderRadius={12}
            style={styles.rightCard}
          />
        </View>

        <View style={styles.badgesRow}>
          <SkeletonPlaceholder.Item width={140} height={32} borderRadius={16} />
          <SkeletonPlaceholder.Item width={140} height={32} borderRadius={16} />
        </View>

        {/* Power Analysis card */}
        <View style={styles.card}>
          <SkeletonPlaceholder.Item width={160} height={18} borderRadius={8} />
          <View style={styles.tableRows}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={52}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={52}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={52}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={52}
              borderRadius={10}
            />
          </View>
        </View>

        {/* Detailed Stats card */}
        <View style={styles.card}>
          <SkeletonPlaceholder.Item width={160} height={18} borderRadius={8} />
          <View style={styles.tableRows}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={64}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={52}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={52}
              borderRadius={10}
            />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}
