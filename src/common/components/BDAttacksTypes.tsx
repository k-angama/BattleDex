import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardAttackEntity } from '../../features/home/domaine/entities/CardEntity';
import { useTheme } from '../../styles';
import * as Constants from '../utils/constants';
import { BDDivider } from './BDDivider';

type BDAttacksTypesProps = {
  attacks?: CardAttackEntity[];
};

export function BDAttacksTypes({ attacks }: BDAttacksTypesProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!attacks || attacks.length === 0) {
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
      {attacks.map((attack, attackIndex) => (
        <>
          <View
            style={[styles.containerRow]}
            key={`${attack.name}-${attackIndex}`}
          >
            <View key={`${attack.name}-${attackIndex}`} style={[styles.row]}>
              {attack.cost.map((entry, costIndex) => (
                <Text
                  key={`${entry.type}-${attackIndex}-${costIndex}`}
                  style={styles.emoji}
                >
                  {getEmoji(entry.type)}
                </Text>
              ))}
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {attack.name}
            </Text>
            <Text style={styles.label}>{attack.damage}</Text>
          </View>
          {attackIndex < attacks.length - 1 && <BDDivider />}
        </>
      ))}
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
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
      flexDirection: 'column',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    emoji: {
      height: 24,
    },
    label: {
      fontSize: theme.typography.size.sm,
      color: theme.colors.text,
      fontFamily: theme.typography.family.medium,
    },
  });
