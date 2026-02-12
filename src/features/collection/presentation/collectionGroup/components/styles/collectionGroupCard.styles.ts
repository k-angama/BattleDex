import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        menuContainer: {
          flex: 1 / 2,
          ...theme.shadow.card,
        },
        cardContainer: {
          marginHorizontal: theme.spacing.xs,
          borderRadius: theme.radius.md,
          overflow: 'hidden',
        },
        cardPressed: {
          opacity: 0.7,
        },
        cardHeader: {
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        },
        cardIconContainer: {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        cardContent: {
          padding: theme.spacing.md,
          alignItems: 'center',
        },
        cardName: {
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
          textAlign: 'center',
        },
        cardCount: {
          color: theme.colors.textSecondary,
          textAlign: 'center',
        },
      }),
    [theme],
  );

  return { styles };
};
