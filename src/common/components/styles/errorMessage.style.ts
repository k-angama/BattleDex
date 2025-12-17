import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles';

export const useErrorMessageStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: theme.spacing.lg,
          marginVertical: theme.spacing.xl,
          padding: theme.spacing.lg,
          borderRadius: theme.radius.lg,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.danger,
          alignItems: 'center',
        },
        icon: {
          fontSize: theme.typography.size.xl,
          marginBottom: theme.spacing.sm,
        },
        message: {
          textAlign: 'center',
          color: theme.colors.danger,
        },
        retry: {
          marginTop: theme.spacing.md,
          color: theme.colors.info,
          fontWeight: '700',
        },
      }),
    [theme],
  );
};
