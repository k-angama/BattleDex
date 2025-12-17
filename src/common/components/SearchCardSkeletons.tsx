import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../styles';
import { useSearchCardSkeletonStyles } from './styles/searchCardSkeletons.style';

interface SearchCardSkeletonsProps {
  count?: number;
}

export function SearchCardSkeletons({ count = 4 }: SearchCardSkeletonsProps) {
  const { theme } = useTheme();
  const styles = useSearchCardSkeletonStyles();

  return (
    <SkeletonPlaceholder borderRadius={theme.radius.md}>
      <View style={styles.container}>
        {Array.from({ length: count }).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardImage} />
            <View style={styles.cardName} />
            <View style={styles.cardMeta} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
}
