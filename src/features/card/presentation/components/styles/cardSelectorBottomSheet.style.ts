import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useCardSelectorStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        sheetBackground: {
          borderTopLeftRadius: theme.radius.xl,
          borderTopRightRadius: theme.radius.xl,
          backgroundColor: theme.colors.surface,
        },
        handle: {
          backgroundColor: theme.colors.border,
          width: 52,
        },
        content: {
          flex: 1,
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.xl,
        },
        searchBar: {
          marginBottom: theme.spacing.md,
        },
        listContent: {
          paddingBottom: theme.spacing.xxl,
        },
        columnWrapper: {
          justifyContent: 'space-between',
          marginBottom: theme.spacing.md,
        },
        errorState: {
          paddingVertical: theme.spacing.md,
        },
      }),
    [theme],
  );
};
