import { useHeaderHeight } from '@react-navigation/elements';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();
  const headerHeight = useHeaderHeight();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingTop: headerHeight,
        },
        listContent: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
          gap: theme.spacing.md,
        },
        columnWrapper: {
          gap: theme.spacing.md,
          justifyContent: 'space-between',
        },
        emptyStateContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.lg,
        },
        emptyStateText: {
          fontSize: 16,
          color: theme.colors.textSecondary,
          textAlign: 'center',
        },
      }),
    [theme, headerHeight],
  );

  return { styles };
};
