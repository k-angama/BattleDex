import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { CardAttackEntity } from '../../features/home/domaine/entities/CardEntity';
import { Theme, useTheme } from '../../styles';
import * as Constants from '../utils/constants';
import { BDDivider } from './BDDivider';
import { BDTypography } from './BDTypography';

type DisplayAttacks = 'column' | 'row';

type BDAttacksTypesProps = {
  attacks?: CardAttackEntity[];
  diplay?: DisplayAttacks;
};

export function BDAttacksTypes({ attacks, diplay }: BDAttacksTypesProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const displayStyles = useMemo(() => createDisplayStyles(theme), [theme]);

  const resolvedDisplay = displayStyles[diplay ?? 'column'];

  if (!attacks || attacks.length === 0) {
    return (
      <View style={styles.container}>
        <BDTypography variant="label" style={styles.label}>
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
      {attacks.map((attack, attackIndex) => (
        <React.Fragment key={`${attack.name}-${attackIndex}`}>
          <View
            style={[styles.containerRow, resolvedDisplay.container]}
            key={`${attack.name}-${attackIndex}`}
          >
            <View key={`${attack.name}-${attackIndex}`} style={[styles.row]}>
              {attack.cost.map((entry, costIndex) => (
                <BDTypography
                  variant="label"
                  key={`${entry.type}-${attackIndex}-${costIndex}`}
                  style={styles.emoji}
                >
                  {getEmoji(entry.type)}
                </BDTypography>
              ))}
            </View>
            <BDTypography variant="label" numberOfLines={1}>
              {attack.name}
            </BDTypography>
            <BDTypography
              variant="label"
              style={[styles.label, resolvedDisplay.label]}
            >
              {attack.damage}
            </BDTypography>
          </View>
          {attackIndex < attacks.length - 1 && <BDDivider />}
        </React.Fragment>
      ))}
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingVertical: theme.spacing.xs,
      width: '100%',
    },
    multiline: {
      gap: theme.spacing.sm,
    },
    containerRow: {
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    emoji: {
      height: 24,
    },
    label: {},
  });

const createDisplayStyles = (theme: Theme) => ({
  column: {
    container: {
      flexDirection: 'column',
    } as ViewStyle,
    label: {} as ViewStyle,
  },
  row: {
    container: {
      flexDirection: 'row',
      gap: theme.spacing.xs,
    } as ViewStyle,
    label: {
      marginLeft: 'auto',
    } as ViewStyle,
  },
});
