import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingTop: Platform.OS === 'ios' ? theme.spacing.lg : 0,
        },
        scrollContent: {
          paddingBottom: theme.spacing.xxl,
          paddingTop: theme.spacing.xxxl,
        },
        battleArena: {
          height: 270,
          position: 'relative',
          paddingTop: theme.spacing.lg,
        },
        cardWrapper: {
          position: 'absolute',
          width: 170,
          alignItems: 'center',
        },
        cardLeft: {
          left: 30,
          top: 56,
        },
        cardRight: {
          right: 30,
          top: 20,
          zIndex: 10,
        },
        card: {
          width: '100%',
          aspectRatio: 3 / 4,
          borderRadius: theme.radius.md,
          overflow: 'hidden',
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderWidth: 2,
          shadowColor: theme.colors.textDark,
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        },
        cardImage: {
          width: '100%',
          height: '100%',
        },
        winNameTag: {
          marginLeft: 'auto',
        },
        winTag: {
          position: 'absolute',
          top: 0,
          right: 28,
          zIndex: 10,
        },
        loseTag: {
          position: 'absolute',
          top: 32,
          left: 28,
          zIndex: 10,
        },
        drawTag: {
          position: 'relative',
          top: -120,
          margin: 'auto',
          width: '50%',
          zIndex: 10,
        },
        loseNameTag: {
          marginRight: 'auto',
        },
        containerNameTag: {
          paddingHorizontal: theme.spacing.lg,
          gap: theme.spacing.md,
        },
        vsCircle: {
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: [{ translateX: -28 }, { translateY: -28 }],
          elevation: 8,
          zIndex: 10,
        },
        statusText: {
          textAlign: 'center',
          color: theme.colors.textSecondary,
          marginBottom: theme.spacing.md,
          fontWeight: '600',
        },
        errorText: {
          textAlign: 'center',
          color: theme.colors.danger,
          marginBottom: theme.spacing.md,
          fontWeight: '600',
        },
        section: {
          marginTop: theme.spacing.xl,
          marginHorizontal: theme.spacing.lg,
          paddingHorizontal: 0,
        },
        sectionTitle: {
          paddingHorizontal: theme.spacing.xl,
        },
        powerGrid: {
          flexDirection: 'row',
          gap: theme.spacing.md,
        },
        playerCol: {
          flex: 1,
          gap: theme.spacing.md,
        },
        playerName: {
          fontSize: theme.typography.size.md,
          fontWeight: '700',
          color: theme.colors.textSecondary,
          textAlign: 'center',
        },
        playerWinner: {
          color: theme.colors.success,
        },
        powerCard: {
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: theme.colors.border,
        },
        powerCardWinner: {
          backgroundColor: theme.colors.winnerBadge,
          borderColor: theme.colors.success,
        },
        powerLabel: {
          fontSize: theme.typography.size.xs,
          fontWeight: '600',
          color: theme.colors.textSecondary,
          textTransform: 'uppercase',
        },
        powerLabelWinner: {
          fontSize: theme.typography.size.xs,
          fontWeight: '700',
          color: theme.colors.surface,
          textTransform: 'uppercase',
        },
        powerValue: {
          fontSize: theme.typography.size.xl,
          fontWeight: '800',
          color: theme.colors.text,
        },
        powerValueWinner: {
          fontSize: theme.typography.size.xl,
          fontWeight: '800',
          color: theme.colors.surface,
        },
        winnerCell: {
          backgroundColor: theme.colors.winnerBadge,
        },
        winnerText: {
          color: theme.colors.surface,
          fontWeight: '700',
        },
        loaderAnimation: {
          width: '100%',
          height: 420,
        },
      }),
    [theme],
  );
};
