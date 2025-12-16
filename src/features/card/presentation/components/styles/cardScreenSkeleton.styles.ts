import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../styles';

export const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.spacing?.md ?? 12,
    },
    card: {
      alignSelf: 'center',
    },
    section: {
      marginTop: theme.spacing?.sm ?? 8,
      gap: theme.spacing?.xs ?? 6,
      padding: theme.spacing?.sm ?? 8,
    },
    sectionRow: {
      marginTop: theme.spacing?.sm ?? 8,
      gap: theme.spacing?.sm ?? 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing?.sm ?? 8,
    },
  });
};
