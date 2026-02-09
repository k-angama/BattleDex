import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      }),
    [theme],
  );

  return { styles };
};
