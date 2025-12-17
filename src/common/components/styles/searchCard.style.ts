import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../styles';

export const useSearchCardStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        gridCard: {
          width: '48%',
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.card,
          padding: theme.spacing.md,
          alignItems: 'center',
          shadowColor: theme.colors.textDark,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
        },
        cardImage: {
          width: 90,
          height: 125,
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.sm,
          backgroundColor: theme.colors.skeleton,
        },
        cardName: {
          color: theme.colors.text,
        },
        cardMeta: {
          color: theme.colors.textSecondary,
          marginTop: theme.spacing.xs,
        },
        missingImage: {
          backgroundColor: theme.colors.skeleton,
          borderWidth: 1,
          borderColor: theme.colors.borderMuted,
          alignItems: 'center',
          justifyContent: 'center',
        },
        missingText: {
          color: theme.colors.textMuted,
          fontSize: theme.typography.size.xs,
          fontWeight: '700',
        },
      }),
    [theme],
  );
};
