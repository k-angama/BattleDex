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
        cardContainer: {
          flex: 1,
          alignItems: 'center',
          marginHorizontal: theme.spacing.lg,
        },
        cardSubtitle: {
          fontSize: theme.typography.size.sm,
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.lg,
        },
        infoContainer: {
          marginTop: theme.spacing.xl,
          marginBottom: theme.spacing.lg,
          width: '100%',
        },
        infoRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: theme.spacing.md,
        },
        infoBadge: {
          flex: 1,
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.md,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minWidth: 100,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: theme.colors.border,
        },
        infoBadgeLabel: {
          fontSize: theme.typography.size.xs,
          color: theme.colors.textSecondary,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        infoBadgeValue: {
          fontSize: theme.typography.size.sm,
          fontWeight: '700',
          color: theme.colors.text,
          marginTop: theme.spacing.xs,
        },
        actionContainer: {
          paddingHorizontal: theme.spacing.xl,
          paddingBottom: theme.spacing.xl,
        },
        compareButton: {
          backgroundColor: theme.colors.success,
          paddingVertical: theme.spacing.lg,
          borderRadius: theme.radius.lg,
          shadowColor: theme.colors.success,
          shadowOpacity: 0.3,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        },
        compareButtonText: {
          fontSize: theme.typography.size.md,
          fontWeight: '800',
          color: theme.colors.surface,
          letterSpacing: 0.5,
          textAlign: 'center',
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
          marginTop: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
        },
        changeOpponentText: {
          textAlign: 'center',
          color: theme.colors.info,
          fontWeight: '600',
          fontSize: theme.typography.size.sm,
        },
        compareNowButton: {
          marginTop: theme.spacing.lg,
          backgroundColor: theme.colors.textDark,
          paddingVertical: theme.spacing.md,
          borderRadius: theme.radius.lg,
          alignItems: 'center',
        },
        compareNowText: {
          color: theme.colors.surface,
          fontSize: theme.typography.size.md,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
      }),
    [theme],
  );
};
