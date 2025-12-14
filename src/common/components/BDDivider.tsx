import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../styles';

export type BDDividerProps = {
  /** Thickness of the divider in dp. */
  thickness?: number;
  /** Custom color; defaults to theme border color. */
  color?: string;
  /** Optional horizontal inset (padding left/right). */
  inset?: number;
  /** Extra styles to merge. */
  style?: ViewStyle;
};

export const BDDivider: React.FC<BDDividerProps> = ({
  thickness = 1,
  color,
  inset = 0,
  style,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createStyles(theme, { thickness, color, inset }),
    [theme, thickness, color, inset],
  );

  return <View style={[styles.divider, style]} />;
};

const createStyles = (
  theme: ReturnType<typeof useTheme>['theme'],
  opts: { thickness: number; color?: string; inset: number },
) =>
  StyleSheet.create({
    divider: {
      height: opts.thickness,
      backgroundColor: opts.color ?? theme.colors.border,
      marginLeft: opts.inset,
      marginRight: opts.inset,
      width: '100%',
      borderRadius: opts.thickness / 2,
    },
  });
