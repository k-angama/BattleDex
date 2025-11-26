import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles';

export const useStyles = (topInset: number) => {
  const { theme } = useTheme();
  const searchContainerHeight = theme.spacing.sm + topInset + 60;
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
          paddingTop: theme.spacing.sm + topInset,
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

  return { styles, searchContainerHeight };
};
