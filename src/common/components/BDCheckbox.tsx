import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../styles';

type BDCheckboxProps = {
  selected?: boolean;
  onToggleSelect?: () => void;
};

export function BDCheckbox({ selected, onToggleSelect }: BDCheckboxProps) {
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={styles.selectionButton}
      onPress={onToggleSelect}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.selectionIndicator,
          selected && styles.selectionIndicatorActive,
        ]}
      >
        {selected && <View style={styles.selectionTick} />}
      </View>
    </TouchableOpacity>
  );
}

export const useStyles = () => {
  const { theme } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        selectionButton: {
          position: 'absolute',
          top: theme.spacing.sm,
          left: theme.spacing.sm,
          zIndex: 20,
        },
        selectionIndicator: {
          width: 32,
          height: 32,
          borderRadius: 18,
          borderWidth: 2,
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        },
        selectionIndicatorActive: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        selectionTick: {
          width: 12,
          height: 10,
          bottom: 2,
          borderLeftWidth: 2,
          borderBottomWidth: 2,
          borderColor: theme.colors.surface,
          transform: [{ rotate: '-45deg' }],
        },
      }),
    [theme],
  );
};
