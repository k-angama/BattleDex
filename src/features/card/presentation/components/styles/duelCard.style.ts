import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../styles';

export const useDuelCardStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          width: '40%',
          alignItems: 'center',
          zIndex: -1,
        },
        wrapperLeft: {
          transform: [{ rotate: '-6deg' }],
        },
        wrapperRight: {
          transform: [{ rotate: '6deg' }],
        },
        info: {
          width: '100%',
          marginTop: theme.spacing.sm,
          padding: theme.spacing.md,
          alignItems: 'center',
          borderRadius: theme.radius.md,
          borderWidth: 2,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        },
        name: {
          fontSize: theme.typography.size.md,
          fontWeight: '700',
          color: theme.colors.text,
        },
        subtitle: {
          fontSize: theme.typography.size.sm,
          color: theme.colors.textSecondary,
          marginTop: theme.spacing.xs,
        },
      }),
    [theme],
  );
};
