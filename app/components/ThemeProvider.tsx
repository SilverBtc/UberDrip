import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
};