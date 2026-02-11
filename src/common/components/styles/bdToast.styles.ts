import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../styles';

export const useBDToastStyles = () => {
  const { theme } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          bottom: 30,
          left: theme.spacing.md,
          right: theme.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.radius.sm,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          zIndex: 9999,
        },
        icon: {
          marginRight: theme.spacing.sm,
        },
        message: {
          flex: 1,
          color: '#FFF',
          fontSize: 14,
        },
      }),
    [theme],
  );
};
