import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../styles';

export const useSearchCardSkeletonStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.xl,
          rowGap: theme.spacing.md,
        },
        card: {
          width: '38%',
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          alignItems: 'center',
        },
        cardImage: {
          width: 90,
          height: 125,
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.sm,
        },
        cardName: {
          width: '70%',
          height: 14,
          borderRadius: theme.radius.sm,
          marginBottom: theme.spacing.xs,
        },
        cardMeta: {
          width: '50%',
          height: 12,
          borderRadius: theme.radius.sm,
        },
      }),
    [theme],
  );
};
