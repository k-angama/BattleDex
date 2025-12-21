import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CardResistancesEntity,
  CardWeaknessesEntity,
} from '../../features/home/domaine/entities/CardEntity';
import { useTheme } from '../styles';
import * as Constants from '../utils/constants';
import { BDTypography } from './BDTypography';

type BDEnergieTypeProps = {
  type?: (CardResistancesEntity | CardWeaknessesEntity)[];
};

export function BDEnergieType({ type }: BDEnergieTypeProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!type || type.length === 0) {
    return (
      <View style={styles.container}>
        <BDTypography variant="label" numberOfLines={1}>
          N/A
        </BDTypography>
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
          <BDTypography style={styles.emoji}>
            {getEmoji(entry.type)}
          </BDTypography>
          <BDTypography variant="label" numberOfLines={1}>
            {entry.name} {entry.value}
          </BDTypography>
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
  });
