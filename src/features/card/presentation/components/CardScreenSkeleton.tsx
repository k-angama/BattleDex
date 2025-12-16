import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useStyles } from './styles/cardScreenSkeleton.styles';

export type CardScreenSkeletonProps = {
  cardWidth: number;
};

export function CardScreenSkeleton({ cardWidth }: CardScreenSkeletonProps) {
  const styles = useStyles();

  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <SkeletonPlaceholder.Item
          width={cardWidth}
          height={cardWidth * (4 / 2.9)}
          borderRadius={16}
          style={styles.card}
        />

        <View style={styles.section}>
          <SkeletonPlaceholder.Item
            width={'50%'}
            height={18}
            borderRadius={8}
          />
          <SkeletonPlaceholder.Item
            width={'30%'}
            height={18}
            borderRadius={8}
          />
          <SkeletonPlaceholder.Item
            width={'60%'}
            height={18}
            borderRadius={8}
          />
        </View>

        <View style={styles.section}>
          <SkeletonPlaceholder.Item
            width={'40%'}
            height={20}
            borderRadius={8}
          />
          <SkeletonPlaceholder.Item
            width={'70%'}
            height={44}
            borderRadius={12}
          />
        </View>

        <View style={styles.sectionRow}>
          <SkeletonPlaceholder.Item
            width={'45%'}
            height={72}
            borderRadius={12}
          />
          <SkeletonPlaceholder.Item
            width={'45%'}
            height={72}
            borderRadius={12}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}
