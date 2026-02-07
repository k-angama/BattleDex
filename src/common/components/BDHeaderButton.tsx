import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../styles';
import { BDTypography } from './BDTypography';

type BDHeaderButtonProps = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
};

export function BDHeaderButton({
  title,
  disabled,
  onPress,
}: BDHeaderButtonProps) {
  const styles = useStyles();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <BDTypography
        variant="label"
        weight="semibold"
        style={[disabled && styles.textDisabled, styles.text]}
      >
        {title}
      </BDTypography>
    </TouchableOpacity>
  );
}

export const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: 6,
        },
        textDisabled: {
          color: theme.colors.textMuted,
        },
        text: {
          padding: theme.spacing.md,
        },
      }),
    [theme],
  );
};
