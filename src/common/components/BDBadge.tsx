import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Theme, useTheme } from '../../styles';

type BadgeVariant = 'winner' | 'loser' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md';

export interface BDBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function BDBadge({
  label,
  variant = 'info',
  size = 'md',
  style,
  textStyle,
}: BDBadgeProps) {
  const { theme } = useTheme();
  const baseStyles = useMemo(() => createBaseStyles(theme), [theme]);
  const variantStyles = useMemo(() => createVariantStyles(theme), [theme]);
  const sizeStyles = useMemo(() => createSizeStyles(theme), [theme]);

  const resolvedVariant = variantStyles[variant];
  const resolvedSize = sizeStyles[size];

  return (
    <View
      style={[
        baseStyles.container,
        resolvedVariant.container,
        resolvedSize.container,
        style,
      ]}
    >
      <Text
        style={[
          baseStyles.label,
          resolvedVariant.text,
          resolvedSize.text,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const createBaseStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius.md,
      alignSelf: 'flex-start',
    },
    label: {
      fontFamily: theme.typography.family.bold,
      letterSpacing: 0.8,
    },
  });

const createVariantStyles = (theme: Theme) => ({
  winner: {
    container: {
      backgroundColor: theme.colors.winnerBadge,
    } as ViewStyle,
    text: {
      color: theme.colors.surface,
    } as TextStyle,
  },
  loser: {
    container: {
      backgroundColor: theme.colors.loserBadge,
    } as ViewStyle,
    text: {
      color: theme.colors.surface,
    } as TextStyle,
  },
  info: {
    container: {
      backgroundColor: theme.colors.info,
    } as ViewStyle,
    text: {
      color: theme.colors.surface,
    } as TextStyle,
  },
  neutral: {
    container: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    } as ViewStyle,
    text: {
      color: theme.colors.text,
    } as TextStyle,
  },
});

const createSizeStyles = (theme: Theme) => ({
  sm: {
    container: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    } as ViewStyle,
    text: {
      fontSize: theme.typography.size.xs,
    } as TextStyle,
  },
  md: {
    container: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    } as ViewStyle,
    text: {
      fontSize: theme.typography.size.sm,
    } as TextStyle,
  },
});
