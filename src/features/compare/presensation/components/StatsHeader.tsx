import { View } from 'react-native';

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { BDTypography } from '../../../../common/components/BDTypography';
import { useTheme } from '../../../../styles';

type StatsHeaderProps = {
  labelStart: string;
  labelMiddle: string;
  labelEnd: string;
};

export function StatsHeader({
  labelStart,
  labelMiddle,
  labelEnd,
}: StatsHeaderProps) {
  const styles = useStyles();
  return (
    <View style={styles.statsHeader}>
      <BDTypography variant="label" style={styles.headerCell} numberOfLines={1}>
        {labelStart}
      </BDTypography>
      <BDTypography
        variant="label"
        style={styles.headerCellCenter}
        numberOfLines={1}
      >
        {labelMiddle}
      </BDTypography>
      <BDTypography variant="label" style={styles.headerCell} numberOfLines={1}>
        {labelEnd}
      </BDTypography>
    </View>
  );
}

const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        statsHeader: {
          flexDirection: 'row',
          backgroundColor: theme.colors.background,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
        },
        headerCell: {
          flex: 1,
          textAlign: 'center',
          fontWeight: '700',
          color: theme.colors.text,
        },
        headerCellCenter: {
          flex: 1,
          textAlign: 'center',
          color: theme.colors.textSecondary,
          fontWeight: '700',
        },
      }),
    [theme],
  );
};
