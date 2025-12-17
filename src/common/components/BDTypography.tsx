import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { Theme, useTheme } from '../../styles';

export type TypographyVariant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline'
  | 'label';

export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface BDTypographyProps extends TextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: string;
  align?: TextStyle['textAlign'];
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

export function BDTypography({
  children,
  variant = 'body',
  weight = 'regular',
  color,
  align,
  numberOfLines,
  style,
  ...rest
}: BDTypographyProps) {
  const { theme } = useTheme();

  const baseStyles = useMemo(() => createBaseStyles(theme), [theme]);
  const variantStyles = useMemo(() => createVariantStyles(theme), [theme]);
  const weightStyles = useMemo(() => createWeightStyles(theme), [theme]);

  const currentVariant = variantStyles[variant];
  const currentWeight = weightStyles[weight];

  return (
    <Text
      {...rest}
      numberOfLines={numberOfLines}
      style={[
        baseStyles.base,
        currentVariant,
        currentWeight,
        align ? { textAlign: align } : undefined,
        color ? { color } : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const createBaseStyles = (theme: Theme) => ({
  base: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
  } as TextStyle,
});

const createVariantStyles = (theme: Theme) => {
  const lh = theme.typography.lineHeight;
  const size = theme.typography.size;

  return {
    title: {
      fontSize: size.xl,
      lineHeight: size.xl * lh.normal,
      color: theme.colors.text,
    } as TextStyle,
    subtitle: {
      fontSize: size.lg,
      lineHeight: size.lg * lh.normal,
      color: theme.colors.text,
    } as TextStyle,
    body: {
      fontSize: size.md,
      lineHeight: size.md * lh.relaxed,
      color: theme.colors.text,
    } as TextStyle,
    caption: {
      fontSize: size.sm,
      lineHeight: size.sm * lh.normal,
      color: theme.colors.textSecondary,
    } as TextStyle,
    overline: {
      fontSize: size.xs,
      lineHeight: size.xs * lh.tight,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: theme.colors.textMuted,
    } as TextStyle,
    label: {
      fontSize: size.sm,
      lineHeight: size.sm * lh.normal,
      color: theme.colors.text,
    } as TextStyle,
  };
};

const createWeightStyles = (theme: Theme) => ({
  regular: {
    fontFamily: theme.typography.family.regular,
    fontWeight: '400',
  } as TextStyle,
  medium: {
    fontFamily: theme.typography.family.medium,
    fontWeight: '500',
  } as TextStyle,
  semibold: {
    fontFamily: theme.typography.family.semibold,
    fontWeight: '600',
  } as TextStyle,
  bold: {
    fontFamily: theme.typography.family.bold,
    fontWeight: '700',
  } as TextStyle,
});
