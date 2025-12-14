import { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { useTheme } from '../../styles';

type BDCardProps = {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  styleTitle?: ViewStyle;
};

export function BDCard({ children, title, style, styleTitle }: BDCardProps) {
  const styles = useStyles();
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={[styles.text, styleTitle]}>{title}</Text>}
      {children}
    </View>
  );
}

export const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.xl,
          overflow: 'hidden',
          ...theme.shadow.card,
        },
        text: {
          marginBottom: theme.spacing.sm,
          marginTop: -theme.spacing.sm,
          fontFamily: theme.typography.family.semibold,
          fontSize: theme.typography.size.md,
          color: theme.colors.text,
        },
      }),
    [theme],
  );
};
