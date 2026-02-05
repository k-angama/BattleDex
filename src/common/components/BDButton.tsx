import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Theme, useTheme } from '../styles';
import { BDTypography } from './BDTypography';

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export function BDButton({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  testID,
}: ButtonProps) {
  const { theme } = useTheme();

  const baseStyles = useMemo(() => createBaseStyles(theme), [theme]);
  const variantStyles = useMemo(() => createVariantStyles(theme), [theme]);
  const sizeStyles = useMemo(() => createSizeStyles(theme), [theme]);
  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      testID={testID}
      style={[
        baseStyles.base,
        currentVariant.container,
        currentSize.container,
        fullWidth && baseStyles.fullWidth,
        isDisabled && baseStyles.disabled,
        style,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator
          color={currentVariant.text.color}
          size="small"
          style={baseStyles.spinner}
        />
      ) : (
        <View style={baseStyles.content}>
          {leftIcon && (
            <View style={[baseStyles.icon, baseStyles.leftIcon]}>
              {leftIcon}
            </View>
          )}
          <BDTypography
            variant="label"
            style={[
              baseStyles.title,
              currentVariant.text,
              currentSize.text,
              isDisabled && baseStyles.textDisabled,
              textStyle,
            ]}
          >
            {title}
          </BDTypography>
          {rightIcon && (
            <View style={[baseStyles.icon, baseStyles.rightIcon]}>
              {rightIcon}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const createBaseStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      borderRadius: theme.radius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    fullWidth: {
      alignSelf: 'stretch',
    },
    disabled: {
      opacity: 0.6,
    },
    title: {
      fontFamily: theme.typography.family.semibold,
    },
    textDisabled: {
      color: theme.colors.surface,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftIcon: {
      marginRight: theme.spacing.xs,
    },
    rightIcon: {
      marginLeft: theme.spacing.xs,
    },
    spinner: {
      paddingVertical: theme.spacing.sm,
    },
  });

const createVariantStyles = (theme: Theme) => ({
  primary: {
    container: {
      backgroundColor: theme.colors.primary,
    } as ViewStyle,
    text: {
      color: theme.colors.surface,
    } as TextStyle,
  },
  secondary: {
    container: {
      backgroundColor: theme.colors.secondary,
      borderWidth: 1,
      borderColor: theme.colors.border,
    } as ViewStyle,
    text: {
      color: theme.colors.surface,
    } as TextStyle,
  },
  text: {
    container: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    text: {
      color: theme.colors.primary,
    } as TextStyle,
  },
});

const createSizeStyles = (theme: Theme) => ({
  sm: {
    container: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
    } as ViewStyle,
    text: {
      fontSize: theme.typography.size.sm,
    } as TextStyle,
  },
  md: {
    container: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
    } as ViewStyle,
    text: {
      fontSize: theme.typography.size.md,
    } as TextStyle,
  },
  lg: {
    container: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
    } as ViewStyle,
    text: {
      paddingVertical: theme.spacing.xs,
      fontSize: theme.typography.size.md,
    } as TextStyle,
  },
});
