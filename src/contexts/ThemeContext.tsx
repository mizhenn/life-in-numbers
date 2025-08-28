import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Theme, ThemeMode } from '../types/theme';

// Light theme definition
const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#007AFF',
    primaryLight: '#5AC8FA',
    primaryDark: '#0051D5',
    secondary: '#5856D6',
    accent: '#FF9500',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceSecondary: '#FFFFFF',
    text: '#1D1D1F',
    textSecondary: '#424245',
    textMuted: '#8E8E93',
    border: '#D1D1D6',
    borderLight: '#E5E5EA',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',
    gradient: {
      primary: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
      secondary: 'linear-gradient(135deg, #5856D6 0%, #AF52DE 100%)',
      accent: 'linear-gradient(135deg, #FF9500 0%, #FF6B35 100%)',
      background: 'linear-gradient(135deg, #F8F9FA 0%, #E3E3E8 100%)',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '32px',
      hero: '48px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '50%',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.15)',
    glow: '0 0 20px rgba(0, 122, 255, 0.3)',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
};

// Dark theme definition
const darkTheme: Theme = {
  ...lightTheme,
  mode: 'dark',
  colors: {
    primary: '#0A84FF',
    primaryLight: '#64D2FF',
    primaryDark: '#0051D5',
    secondary: '#5E5CE6',
    accent: '#FF9F0A',
    background: '#000000',
    surface: '#1C1C1E',
    surfaceSecondary: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textMuted: '#8E8E93',
    border: '#38383A',
    borderLight: '#48484A',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#0A84FF',
    gradient: {
      primary: 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
      secondary: 'linear-gradient(135deg, #5E5CE6 0%, #AF52DE 100%)',
      accent: 'linear-gradient(135deg, #FF9F0A 0%, #FF6B35 100%)',
      background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
    },
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.6)',
    glow: '0 0 20px rgba(10, 132, 255, 0.4)',
  },
};

interface ThemeState {
  theme: Theme;
  mode: ThemeMode;
  systemPrefersDark: boolean;
}

type ThemeAction =
  | { type: 'SET_MODE'; payload: ThemeMode }
  | { type: 'SET_SYSTEM_PREFERENCE'; payload: boolean }
  | { type: 'TOGGLE_MODE' };

const getInitialMode = (): ThemeMode => {
  const stored = localStorage.getItem('life-in-numbers-theme');
  if (stored && ['light', 'dark', 'auto'].includes(stored)) {
    return stored as ThemeMode;
  }
  return 'auto';
};

const getSystemPreference = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getEffectiveTheme = (mode: ThemeMode, systemPrefersDark: boolean): Theme => {
  if (mode === 'auto') {
    return systemPrefersDark ? darkTheme : lightTheme;
  }
  return mode === 'dark' ? darkTheme : lightTheme;
};

const initialState: ThemeState = {
  mode: getInitialMode(),
  systemPrefersDark: getSystemPreference(),
  theme: getEffectiveTheme(getInitialMode(), getSystemPreference()),
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_MODE':
      const newTheme = getEffectiveTheme(action.payload, state.systemPrefersDark);
      localStorage.setItem('life-in-numbers-theme', action.payload);
      return {
        ...state,
        mode: action.payload,
        theme: newTheme,
      };
    case 'SET_SYSTEM_PREFERENCE':
      return {
        ...state,
        systemPrefersDark: action.payload,
        theme: getEffectiveTheme(state.mode, action.payload),
      };
    case 'TOGGLE_MODE':
      const currentEffectiveMode = state.mode === 'auto' 
        ? (state.systemPrefersDark ? 'dark' : 'light')
        : state.mode;
      const newMode = currentEffectiveMode === 'light' ? 'dark' : 'light';
      const toggledTheme = getEffectiveTheme(newMode, state.systemPrefersDark);
      localStorage.setItem('life-in-numbers-theme', newMode);
      return {
        ...state,
        mode: newMode,
        theme: toggledTheme,
      };
    default:
      return state;
  }
}

interface ThemeContextType extends ThemeState {
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isLight: boolean;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_SYSTEM_PREFERENCE', payload: e.matches });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    const theme = state.theme;

    // Set CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
      }
    });

    Object.entries(theme.colors.gradient).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });

    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    Object.entries(theme.breakpoints).forEach(([key, value]) => {
      root.style.setProperty(`--breakpoint-${key}`, value);
    });

    root.style.setProperty('--font-family', theme.typography.fontFamily);

    // Set theme class on body
    document.body.className = `theme-${theme.mode}`;
  }, [state.theme]);

  const setMode = (mode: ThemeMode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  };

  const toggleMode = () => {
    dispatch({ type: 'TOGGLE_MODE' });
  };

  const contextValue: ThemeContextType = {
    ...state,
    setMode,
    toggleMode,
    isLight: state.theme.mode === 'light',
    isDark: state.theme.mode === 'dark',
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};