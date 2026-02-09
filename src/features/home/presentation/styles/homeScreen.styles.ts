import { useHeaderHeight } from '@react-navigation/elements';
import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../../../common/styles';

export const useStyles = (topInset: number) => {
  const { theme } = useTheme();
  const headerHeight = useHeaderHeight();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
          marginTop: Platform.OS !== 'ios' ? headerHeight : 0,
        },
        list: {
          flex: 1,
        },
        searchContainer: {
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.md,
          paddingTop:
            theme.spacing.sm + (Platform.OS === 'ios' ? topInset - 10 : 0),
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
        deleteBar: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.md,
        },
      }),
    [theme, topInset, headerHeight],
  );

  return { styles };
};
