import React from 'react';
import { Text, View } from 'react-native';
import { Skeleton } from '../../../../common/components/Skeleton';
import { HolographicCard } from './HolographicCard';
import { useDuelCardStyles } from './styles/duelCard.style';

type DuelCardProps = {
  side: 'left' | 'right';
  imageUrl: string;
  name: string;
  subtitle: string;
  width: number;
  isLoading?: boolean;
};

export function DuelCard({
  side,
  imageUrl,
  name,
  subtitle,
  width,
  isLoading = false,
}: DuelCardProps) {
  const styles = useDuelCardStyles();
  return (
    <View
      style={[
        styles.wrapper,
        side === 'left' ? styles.wrapperLeft : styles.wrapperRight,
      ]}
    >
      <HolographicCard
        imageUrl={imageUrl}
        width={width}
        isLoading={isLoading}
      />
      <Skeleton isLoading={isLoading}>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </Skeleton>
    </View>
  );
}
