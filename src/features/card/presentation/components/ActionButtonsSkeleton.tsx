import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useStyles } from './styles/actionButtonsSkeleton.styles';

export function ActionButtonsSkeleton() {
  const styles = useStyles();

  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <SkeletonPlaceholder.Item width="100%" height={48} borderRadius={12} />
        <SkeletonPlaceholder.Item
          width="70%"
          height={14}
          borderRadius={8}
          style={styles.hint}
        />
      </View>
    </SkeletonPlaceholder>
  );
}
