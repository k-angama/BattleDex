import React from 'react';
import { View } from 'react-native';
import { BDTypography } from './BDTypography';
import { useSearchEmptyStyles } from './styles/searchEmpty.style';

export function SearchEmpty() {
  const styles = useSearchEmptyStyles();
  return (
    <View style={styles.emptyState}>
      <BDTypography variant="subtitle" style={styles.emptyStateTitle}>
        No cards found
      </BDTypography>
      <BDTypography variant="body" style={styles.emptyStateSubtitle}>
        Try another name or Pokémon type
      </BDTypography>
    </View>
  );
}
