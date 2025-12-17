import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: theme.spacing.sm,
          marginHorizontal: theme.spacing.lg,
        },
        timeBadge: {
          position: 'absolute',
          top: theme.spacing.md,
          right: theme.spacing.md,
          zIndex: 10,
          backgroundColor: theme.colors.textDark,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.radius.pill,
          shadowColor: theme.colors.textDark,
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        },
        timeText: {
          color: theme.colors.surface,
          fontSize: theme.typography.size.xs,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        cardBox: {
          width: '40%',
          alignItems: 'center',
        },
        imageWrapper: {
          position: 'relative',
          width: '100%',
          aspectRatio: 3 / 4,
          borderRadius: theme.radius.md,
          overflow: 'hidden',
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.textDark,
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
        },
        cardImage: {
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        },
        loseOverlay: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.danger,
          paddingVertical: theme.spacing.xs,
          alignItems: 'center',
        },
        loseText: {
          color: theme.colors.surface,
          letterSpacing: 1,
        },
        winOverlay: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.success,
          paddingVertical: theme.spacing.xs,
          alignItems: 'center',
        },
        winText: {
          color: theme.colors.surface,
          letterSpacing: 1,
        },
        cardName: {
          marginTop: theme.spacing.md,
          fontSize: theme.typography.size.sm,
          fontWeight: '600',
          color: theme.colors.text,
          textAlign: 'center',
          lineHeight: 18,
        },
        vsContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: 60,
        },
        vsCircle: {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.textDark,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        },
        vsLine: {
          position: 'absolute',
          width: 2,
          height: '100%',
          backgroundColor: theme.colors.border,
          zIndex: -1,
        },
      }),
    [theme],
  );
};
