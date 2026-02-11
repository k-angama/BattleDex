import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../../../../common/styles';
import { useStyles } from './styles/collectionCardSkeleton.styles';

interface CollectionCardSkeletonProps {
  count?: number;
}

export function CollectionCardSkeleton({
  count = 6,
}: CollectionCardSkeletonProps) {
  const { theme } = useTheme();
  const { styles } = useStyles();

  return (
    <SkeletonPlaceholder borderRadius={theme.radius.md}>
      <View style={styles.container}>
        {Array.from({ length: count }).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.contentPlaceholder}>
              <View style={styles.titleLine} />
              <View style={styles.scoreLine} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
}
