import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginHorizontal: theme.spacing.lg,
          marginVertical: theme.spacing.md,
          paddingVertical: theme.spacing.xxl,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: theme.radius.lg,
        },
        timeBadge: {
          alignSelf: 'flex-end',
          width: 80,
          height: 26,
          borderRadius: theme.radius.pill,
          marginBottom: theme.spacing.lg,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        cardColumn: {
          width: '38%',
          alignItems: 'center',
        },
        cardImage: {
          width: '100%',
          aspectRatio: 3 / 4,
          borderRadius: theme.radius.md,
        },
        cardLine: {
          width: '70%',
          height: 12,
          borderRadius: theme.radius.sm,
          marginTop: theme.spacing.sm,
        },
        vsColumn: {
          width: '18%',
          alignItems: 'center',
        },
        vsCircle: {
          width: 56,
          height: 56,
          borderRadius: theme.radius.xl,
        },
        vsLine: {
          width: 4,
          height: 80,
          borderRadius: theme.radius.xs,
          marginTop: theme.spacing.md,
        },
        footerLine: {
          marginTop: theme.spacing.xxl,
          height: 10,
          borderRadius: theme.radius.sm,
          width: '50%',
        },
      }),
    [theme],
  );
};
