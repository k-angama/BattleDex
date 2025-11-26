import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles';

export const useSearchBarStyles = () => {
  const { theme } = useTheme();
  const styleSheet = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        errorContainer: {
          marginTop: theme.spacing.sm,
        },
        searchIcon: {
          marginRight: theme.spacing.sm,
        },
        searchIconText: {
          fontSize: theme.typography.size.md,
          color: theme.colors.textMuted,
        },
        input: {
          flex: 1,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.xs,
          fontSize: theme.typography.size.md,
          color: theme.colors.text,
        },
        clearButton: {
          padding: theme.spacing.sm,
          marginLeft: theme.spacing.xs,
        },
        clearButtonText: {
          fontSize: theme.typography.size.md,
          color: theme.colors.textMuted,
          fontWeight: '600',
        },
        suggestionsContainer: {
          marginTop: theme.spacing.sm,
          paddingBottom: 0,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          shadowColor: theme.colors.textDark,
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
          overflow: 'hidden',
          height: '100%',
        },
        listContent: {
          padding: theme.spacing.lg,
          paddingBottom: 200,
        },
        columnWrapper: {
          justifyContent: 'space-between',
          marginBottom: theme.spacing.md,
        },
      }),
    [theme],
  );

  return { styles: styleSheet, placeholderColor: theme.colors.textMuted };
};
