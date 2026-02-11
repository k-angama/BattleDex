import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../../../../common/styles';
import { useStyles } from './styles/collectionGroupCardSkeleton.styles';

interface CollectionGroupCardSkeletonProps {
  count?: number;
}

export function CollectionGroupCardSkeleton({
  count = 6,
}: CollectionGroupCardSkeletonProps) {
  const { theme } = useTheme();
  const { styles } = useStyles();

  return (
    <SkeletonPlaceholder borderRadius={theme.radius.lg}>
      <View style={styles.container}>
        {Array.from({ length: count }).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader} />
            <View style={styles.cardContent}>
              <View style={styles.iconPlaceholder} />
              <View style={styles.textContainer}>
                <View style={styles.titleLine} />
                <View style={styles.countLine} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
}
