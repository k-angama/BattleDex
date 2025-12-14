import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../../styles';

export type StatsRowProps = {
  labelStart: string | number | React.ReactNode;
  labelMiddle: string;
  labelEnd: string | number | React.ReactNode;
  style?: ViewStyle;
};

export function StatsRow({
  labelStart,
  labelMiddle,
  labelEnd,
  style,
}: StatsRowProps) {
  const styles = useStyles();
  return (
    <View style={[styles.statRow, style]}>
      <View style={[styles.statCell]}>
        {React.isValidElement(labelStart) ? (
          labelStart
        ) : (
          <Text style={[styles.statValue]}>{labelStart}</Text>
        )}
      </View>

      <View style={styles.statLabel}>
        <Text style={styles.statLabelText}>{labelMiddle}</Text>
      </View>

      <View style={[styles.statCell]}>
        {React.isValidElement(labelEnd) ? (
          labelEnd
        ) : (
          <Text style={[styles.statValue]}>{labelEnd}</Text>
        )}
      </View>
    </View>
  );
}

const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        statRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          paddingHorizontal: theme.spacing.xl,
        },
        statCell: {
          flex: 1,
          alignItems: 'center',
          paddingVertical: theme.spacing.xs,
        },
        statLabel: {
          flex: 1,
          alignItems: 'center',
        },
        statLabelText: {
          fontSize: theme.typography.size.xs,
          fontWeight: '600',
          color: theme.colors.textSecondary,
        },
        statValue: {
          fontSize: theme.typography.size.md,
          fontWeight: '600',
          color: theme.colors.text,
        },
      }),
    [theme],
  );
};
