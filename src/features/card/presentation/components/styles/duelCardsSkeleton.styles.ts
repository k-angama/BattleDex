import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.spacing.md,
    },
    duelArena: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sm,
    },
    vsBadge: {
      marginHorizontal: theme.spacing.xs,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: [{ translateX: -30 }, { translateY: -30 }],
      elevation: 8,
      zIndex: 10,
    },
    nameTagsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
    },
    statsTable: {
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
    },
    leftCard: {
      transform: [{ rotate: '-6deg' }],
    },
    rightCard: {
      transform: [{ rotate: '6deg' }],
    },
  });
};
