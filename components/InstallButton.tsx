import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePWA } from '../hooks/usePWA';

interface InstallButtonProps {
  style?: any;
  textStyle?: any;
  showIcon?: boolean;
}

export const InstallButton: React.FC<InstallButtonProps> = ({ 
  style, 
  textStyle, 
  showIcon = true 
}) => {
  const { canInstall, installApp } = usePWA();

  if (!canInstall) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      console.log('App installed successfully!');
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.installButton, style]} 
      onPress={handleInstall}
      accessibilityLabel="Install UberDrip App"
    >
      <View style={styles.buttonContent}>
        {showIcon && (
          <Ionicons 
            name="download-outline" 
            size={20} 
            color="#ffffff" 
            style={styles.icon}
          />
        )}
        <Text style={[styles.buttonText, textStyle]}>
          Install App
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  installButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
