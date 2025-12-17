import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles';

export const useSearchEmptyStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        emptyState: {
          width: '100%',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.lg,
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        emptyStateTitle: {
          fontWeight: '700',
          marginBottom: theme.spacing.xs,
          textAlign: 'center',
        },
        emptyStateSubtitle: {
          color: theme.colors.textSecondary,
          textAlign: 'center',
        },
      }),
    [theme],
  );
};
