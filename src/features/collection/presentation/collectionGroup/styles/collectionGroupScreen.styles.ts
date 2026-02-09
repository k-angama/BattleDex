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
          paddingVertical: theme.spacing.md,
        },
        columnWrapper: {
          justifyContent: 'flex-start',
          marginBottom: theme.spacing.lg,
          gap: theme.spacing.md,
        },
        spacer: {
          flex: 1,
          minWidth: '48%',
        },
      }),
    [theme, headerHeight],
  );

  return { styles };
};
