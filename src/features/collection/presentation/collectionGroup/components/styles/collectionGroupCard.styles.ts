import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cardContainer: {
          flex: 1,
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          overflow: 'hidden',
          marginHorizontal: theme.spacing.xs,
          shadowColor: theme.colors.textDark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
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
