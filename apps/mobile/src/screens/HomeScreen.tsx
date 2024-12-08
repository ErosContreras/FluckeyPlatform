import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.displayName || 'User'}!</Text>
      <Button 
        title="Sign Out" 
        onPress={signOut}
        variant="secondary"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
});