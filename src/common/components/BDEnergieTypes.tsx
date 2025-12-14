import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CardResistancesEntity,
  CardWeaknessesEntity,
} from '../../features/home/domaine/entities/CardEntity';
import { useTheme } from '../../styles';
import * as Constants from '../utils/constants';

type BDEnergieTypeProps = {
  type?: (CardResistancesEntity | CardWeaknessesEntity)[];
};

export function BDEnergieType({ type }: BDEnergieTypeProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!type || type.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>N/A</Text>
      </View>
    );
  }

  const getEmoji = (energyType?: string) => {
    if (!energyType) {
      return '⚪';
    }
    return Constants.ENERGY_EMOJI[energyType.toLowerCase()] ?? '⚪';
  };

  return (
    <View style={[styles.container, styles.multiline]}>
      {type.map((entry, index) => (
        <View key={`${entry.type}-${index}`} style={styles.row}>
          <Text style={styles.emoji}>{getEmoji(entry.type)}</Text>
          <Text numberOfLines={1} style={styles.label}>
            {entry.name} {entry.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingVertical: theme.spacing.xs,
    },
    multiline: {
      gap: theme.spacing.xs,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    emoji: {
      marginRight: theme.spacing.xs,
      height: 24,
    },
    label: {
      fontSize: theme.typography.size.sm,
      color: theme.colors.text,

      fontFamily: theme.typography.family.medium,
    },
  });
