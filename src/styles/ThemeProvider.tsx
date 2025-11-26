import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme } from './themes';

type ThemeContextValue = {
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue>({ theme: lightTheme });

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const scheme = useColorScheme();
  const value = useMemo(
    () => ({ theme: scheme === 'dark' ? darkTheme : lightTheme }),
    [scheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
