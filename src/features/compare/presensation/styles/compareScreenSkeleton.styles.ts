import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
    },
    spacerSm: {
      marginTop: theme.spacing.xs,
    },
    battleArena: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.sm,
    },
    badgesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.sm,
    },
    card: {
      gap: theme.spacing.sm,
      padding: theme.spacing.sm,
    },
    tableRows: {
      gap: theme.spacing.xs,
      marginTop: theme.spacing.xs,
    },
    leftCard: {
      transform: [{ rotate: '-6deg' }],
    },
    rightCard: {
      transform: [{ rotate: '6deg' }],
    },
  });
};
