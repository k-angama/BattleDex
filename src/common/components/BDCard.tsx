import { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../styles';
import { BDTypography } from './BDTypography';

type BDCardProps = {
  title?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styleTitle?: ViewStyle;
  selected?: boolean;
};

export function BDCard({
  children,
  title,
  style,
  styleTitle,
  selected,
}: BDCardProps) {
  const styles = useStyles();
  return (
    <View
      style={[styles.container, style, selected && styles.editModeContainer]}
    >
      {title && (
        <BDTypography
          style={[styles.text, styleTitle]}
          variant="subtitle"
          weight="bold"
        >
          {title}
        </BDTypography>
      )}
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
          // overflow: 'hidden',
          ...theme.shadow.card,
          borderWidth: 0,
        },
        editModeContainer: {
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
        text: {
          marginBottom: theme.spacing.sm,
          marginTop: -theme.spacing.sm,
        },
      }),
    [theme],
  );
};
