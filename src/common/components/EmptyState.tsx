import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type EmptyStateProps = {
  message: string;
  emoji?: string;
};

export function EmptyState({ message, emoji = '📭' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
});
