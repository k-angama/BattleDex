import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles';

export const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        content: {
          flex: 1,
          justifyContent: 'space-between',
        },
        scrollContent: {
          marginHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.lg,
          gap: theme.spacing.lg,
        },
        cardContainer: {
          flex: 1,
        },
        containerLastInfo: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        containerInfo: {
          gap: theme.spacing.sm,
        },
        actionContainer: {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.xl,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.background,
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 8,
        },
        hintText: {
          fontSize: theme.typography.size.xs,
          color: theme.colors.textSecondary,
          textAlign: 'center',
          marginTop: theme.spacing.sm,
        },
        selectionHint: {
          fontSize: theme.typography.size.xs,
          color: theme.colors.textMuted,
          textAlign: 'center',
          marginTop: theme.spacing.xs,
        },
        duelArena: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: theme.spacing.lg,
          paddingHorizontal: theme.spacing.sm,
        },
        vsBadge: {
          width: 58,
          height: 58,
          borderRadius: theme.radius.xl,
          backgroundColor: theme.colors.textDark,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: theme.colors.textDark,
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        },
        vsBadgeText: {
          color: theme.colors.surface,
          fontSize: theme.typography.size.md,
          fontWeight: '800',
          letterSpacing: 1,
        },
        changeOpponentButton: {
          marginBottom: theme.spacing.xl,
        },
        containerNameTag: {
          flexDirection: 'row',
          flexShrink: 1,
          paddingHorizontal: theme.spacing.lg,
          gap: theme.spacing.md,
          marginBottom: theme.spacing.lg,
        },
        nameTag: { flex: 1 },
      }),
    [theme],
  );
};
