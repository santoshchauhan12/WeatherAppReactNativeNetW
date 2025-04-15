import React, {createContext, useContext, useMemo, useState} from 'react';
import themes, {defaultTheme} from '..';
import type { ThemePreferenceWithoutSystem, ThemeColors } from '../types';
// import styles, { ThemeStyles } from 'src/styles/index';

import { ThemeStyles } from 'src/styles';
import styles from '../../index'; 


type ThemeContextType = {
  theme: ThemePreferenceWithoutSystem;
  toggleTheme: () => void;
  themeColors: ThemeColors;
  themedStyles: ThemeStyles;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  themeColors: defaultTheme,
  themedStyles: styles(defaultTheme),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemePreferenceWithoutSystem>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const themeColors = useMemo(() => themes[theme], [theme]);
  const themedStyles = useMemo(() => styles(themeColors), [themeColors]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors, themedStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
