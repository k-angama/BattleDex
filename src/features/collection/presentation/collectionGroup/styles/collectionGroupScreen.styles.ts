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
        },
        columnWrapper: {
          justifyContent: 'space-between',
          marginBottom: theme.spacing.lg,
        },
        emptyStateContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.xl,
        },
        createButton: {
          marginTop: theme.spacing.xl,
          minWidth: 200,
        },
      }),
    [theme, headerHeight],
  );

  return { styles };
};
