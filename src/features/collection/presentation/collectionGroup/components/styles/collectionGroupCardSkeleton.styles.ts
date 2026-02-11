import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          gap: theme.spacing.md,
        },
        card: {
          width: '48%',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          overflow: 'hidden',
        },
        cardHeader: {
          height: 60,
          backgroundColor: theme.colors.background,
        },
        cardContent: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.md,
          gap: theme.spacing.md,
        },
        iconPlaceholder: {
          width: 40,
          height: 40,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.background,
        },
        textContainer: {
          flex: 1,
          gap: theme.spacing.sm,
        },
        titleLine: {
          height: 14,
          borderRadius: theme.radius.sm,
          backgroundColor: theme.colors.background,
        },
        countLine: {
          height: 12,
          width: '60%',
          borderRadius: theme.radius.sm,
          backgroundColor: theme.colors.background,
        },
      }),
    [theme],
  );

  return { styles };
};
