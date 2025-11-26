import React from 'react';
import { Text, View } from 'react-native';
import { useSearchEmptyStyles } from './styles/searchEmpty.style';

export function SearchEmpty() {
  const styles = useSearchEmptyStyles();
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No cards found</Text>
      <Text style={styles.emptyStateSubtitle}>
        Try another name or Pokémon type
      </Text>
    </View>
  );
}
