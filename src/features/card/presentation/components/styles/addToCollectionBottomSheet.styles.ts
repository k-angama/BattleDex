import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingBottom: theme.spacing.lg,
        },
        indicator: {
          backgroundColor: theme.colors.border,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        loadingIndicator: {
          marginLeft: theme.spacing.sm,
        },
        headerRight: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
        },
        createIconButton: {
          padding: theme.spacing.sm,
        },
        listContent: {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
        },
        collectionItem: {
          paddingVertical: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        collectionItemDisabled: {
          opacity: 0.5,
        },
        collectionItemContent: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
        },
        colorIndicator: {
          width: 4,
          height: 40,
          borderRadius: theme.radius.sm,
        },
        collectionInfo: {
          flex: 1,
          gap: theme.spacing.xs,
        },
        cardCount: {
          color: theme.colors.textSecondary,
        },
        emptyState: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: theme.spacing.xxl,
          gap: theme.spacing.md,
        },
        emptyText: {
          marginTop: theme.spacing.md,
          color: theme.colors.textSecondary,
        },
        createButton: {
          marginTop: theme.spacing.lg,
        },
      }),
    [theme],
  );

  return { styles };
};
