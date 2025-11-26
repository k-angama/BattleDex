import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../styles';

export const useHolographicCardStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        gestureContainer: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        canvas: {
          borderRadius: theme.radius.lg,
        },
      }),
    [theme],
  );
};
