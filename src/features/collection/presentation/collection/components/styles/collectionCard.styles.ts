import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          margin: theme.spacing.sm,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.surface,
          overflow: 'hidden',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        imageContainer: {
          width: '100%',
          height: 200,
          backgroundColor: theme.colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        },
        image: {
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
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
      }),
    [theme],
  );

  return { styles };
};
