import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
          gap: theme.spacing.md,
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        card: {
          width: '48%',
          borderRadius: theme.radius.md,
          overflow: 'hidden',
        },
        imagePlaceholder: {
          width: '100%',
          height: 200,
          backgroundColor: theme.colors.background,
        },
        contentPlaceholder: {
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
        },
        titleLine: {
          width: '80%',
          height: 16,
          backgroundColor: theme.colors.background,
          borderRadius: theme.radius.sm,
        },
        scoreLine: {
          width: '40%',
          height: 14,
          backgroundColor: theme.colors.background,
          borderRadius: theme.radius.sm,
        },
      }),
    [theme],
  );

  return { styles };
};
