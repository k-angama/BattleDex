import { darkColors, lightColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export type Theme = typeof lightTheme;

export const lightTheme = {
  colors: lightColors,
  spacing,
  typography,
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
    pill: 999,
    full: 9999,
  },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 1,
    },
  },
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  typography,
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
    pill: 999,
    full: 9999,
  },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
  },
};
