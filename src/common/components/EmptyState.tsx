import React from 'react';
import { Text, View } from 'react-native';
import { BDTypography } from './BDTypography';
import { useEmptyStateStyles } from './styles/emptyState.style';

type EmptyStateProps = {
  message: string;
  emoji?: string;
};

export function EmptyState({ message, emoji = '📭' }: EmptyStateProps) {
  const styles = useEmptyStateStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <BDTypography style={styles.message}>{message}</BDTypography>
    </View>
  );
}
