import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useScrollIndicatorStyles = () => {
  const { theme } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: theme.spacing.xs,
        },
        text: {
          color: theme.colors.primary,
          fontSize: theme.typography.size.xs,
        },
        icon: {
          color: theme.colors.primary,
        },
      }),
    [theme],
  );
};
