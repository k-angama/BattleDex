import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../styles';

export const useEmptyStateStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: theme.spacing.xxl,
          paddingVertical: theme.spacing.xxxl,
        },
        emoji: {
          fontSize: 48,
          marginBottom: theme.spacing.lg,
        },
        message: {
          textAlign: 'center',
          color: theme.colors.textSecondary,
          fontWeight: '600',
        },
      }),
    [theme],
  );
};
