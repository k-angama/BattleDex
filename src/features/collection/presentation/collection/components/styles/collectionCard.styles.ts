import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container2: {
          flex: 1 / 2,
          ...theme.shadow.card,
        },
        container: {
          margin: theme.spacing.sm,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.surface,
          overflow: 'hidden',
          ...theme.shadow.card,
        },
        imageContainer: {
          width: '100%',
          aspectRatio: 3 / 4,
          backgroundColor: theme.colors.background,
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing.md,
        },
        image: {
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
          borderRadius: theme.radius.sm,
        },
        contentContainer: {
          padding: theme.spacing.md,
        },
        title: {
          marginBottom: theme.spacing.sm,
        },
        scoreContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        scoreLabel: {
          color: theme.colors.textSecondary,
        },
        scoreValue: {
          color: theme.colors.primary,
          fontWeight: '600',
        },
        rankBadge: {
          position: 'absolute',
          top: theme.spacing.sm,
          left: theme.spacing.sm,
          backgroundColor: theme.colors.surface,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.radius.md,
          minWidth: 32,
          alignItems: 'center',
          justifyContent: 'center',
          ...theme.shadow.card,
        },
        rankBadgeTop: {
          backgroundColor: theme.colors.background,
          borderWidth: 2,
          borderColor: theme.colors.primary,
        },
        rankText: {
          color: theme.colors.text,
          textAlign: 'center',
        },
      }),
    [theme],
  );

  return { styles };
};
