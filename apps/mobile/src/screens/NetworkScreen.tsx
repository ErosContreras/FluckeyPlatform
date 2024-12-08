import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const NetworkScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network</Text>
      <Text style={styles.subtitle}>Connect with other creatives</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});