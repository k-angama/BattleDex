import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BDTypography } from '../../../../common/components/BDTypography';
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
          <BDTypography
            variant="label"
            style={styles.statValue}
            numberOfLines={1}
          >
            {labelStart}
          </BDTypography>
        )}
      </View>

      <View style={styles.statLabel}>
        <BDTypography
          variant="caption"
          style={styles.statLabelText}
          numberOfLines={1}
        >
          {labelMiddle}
        </BDTypography>
      </View>

      <View style={[styles.statCell]}>
        {React.isValidElement(labelEnd) ? (
          labelEnd
        ) : (
          <BDTypography
            variant="label"
            style={[styles.statValue]}
            numberOfLines={1}
          >
            {labelEnd}
          </BDTypography>
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
          color: theme.colors.textSecondary,
        },
        statValue: {
          color: theme.colors.text,
        },
      }),
    [theme],
  );
};
