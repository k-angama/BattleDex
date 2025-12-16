import React from 'react';
import { View } from 'react-native';
import { HolographicCard } from './HolographicCard';
import { useDuelCardStyles } from './styles/duelCard.style';

type DuelCardProps = {
  side: 'left' | 'right';
  imageUrl: string;
  width: number;
};

export function DuelCard({ side, imageUrl, width }: DuelCardProps) {
  const styles = useDuelCardStyles();
  return (
    <View
      style={[
        styles.wrapper,
        side === 'left' ? styles.wrapperLeft : styles.wrapperRight,
      ]}
    >
      <HolographicCard imageUrl={imageUrl} width={width} />
    </View>
  );
}
