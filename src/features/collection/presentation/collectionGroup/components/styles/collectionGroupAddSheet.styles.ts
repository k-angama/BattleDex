import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
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
        container: {
          flex: 1,
          gap: theme.spacing.lg,
        },
        title: {
          marginBottom: theme.spacing.sm,
        },
        inputContainer: {
          gap: theme.spacing.sm,
        },
        input: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          fontSize: theme.typography.size.md,
          color: theme.colors.text,
          backgroundColor: theme.colors.card,
        },
        colorSection: {
          gap: theme.spacing.sm,
        },
        colorGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        },
        colorSwatch: {
          width: 36,
          height: 36,
          borderRadius: 18,
          borderWidth: 2,
          borderColor: 'transparent',
        },
        colorSwatchSelected: {
          borderColor: theme.colors.text,
        },
        actions: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: theme.spacing.sm,
          marginTop: 'auto',
          marginBottom: theme.spacing.xl,
        },
        actionButton: {
          flex: 1,
        },
      }),
    [theme],
  );

  return { styles, placeholderColor: theme.colors.textMuted };
};
