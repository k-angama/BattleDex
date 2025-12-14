import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Theme, useTheme } from '../../styles';

type CircularBadgeVariant = 'normal' | 'neutral';

export interface BDCircularBadgeProps {
  label: string;
  variant?: CircularBadgeVariant;
  size?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function BDCircularBadge({
  label,
  variant = 'normal',
  size = 56,
  style,
  textStyle,
}: BDCircularBadgeProps) {
  const { theme } = useTheme();
  const baseStyles = useMemo(() => createBaseStyles(theme), [theme]);
  const variantStyles = useMemo(() => createVariantStyles(theme), [theme]);
  const resolvedVariant = variantStyles[variant];

  const dimensionStyle: ViewStyle = { width: size, height: size };

  return (
    <View
      style={[
        baseStyles.container,
        resolvedVariant.container,
        dimensionStyle,
        style,
      ]}
    >
      <Text style={[baseStyles.label, resolvedVariant.text, textStyle]}>
        {label}
      </Text>
    </View>
  );
}

const createBaseStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius.full,
      borderWidth: 3,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    label: {
      fontSize: theme.typography.size.md,
      fontWeight: '900',
      fontFamily: theme.typography.family.bold,
      textTransform: 'uppercase',
    },
  });

const createVariantStyles = (theme: Theme) => ({
  normal: {
    container: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    } as ViewStyle,
    text: {
      color: theme.colors.text,
    } as TextStyle,
  },
  neutral: {
    container: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
    } as ViewStyle,
    text: {
      color: theme.colors.text,
    } as TextStyle,
  },
});
