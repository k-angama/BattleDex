import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../styles';

export const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    hint: {
      marginVertical: theme.spacing.xs,
      alignSelf: 'center',
    },
  });
};
