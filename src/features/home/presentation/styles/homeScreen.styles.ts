import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles';

export const useStyles = (topInset: number) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        list: {
          flex: 1,
        },
        searchContainer: {
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.md,
          paddingTop:
            theme.spacing.sm + (Platform.OS === 'ios' ? topInset + 10 : 0),
          backgroundColor: theme.colors.background,
          shadowColor: theme.colors.textDark,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          zIndex: 10,
        },
        listContent: {
          paddingHorizontal: theme.spacing.sm,
          paddingBottom: theme.spacing.xl,
        },
      }),
    [theme, topInset],
  );

  return { styles };
};
