import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { PROFESSIONS } from '@creative-network/shared/src/constants';

export const SignUpScreen = () => {
  const { signUp, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    profession: [] as string[],
    skills: [] as string[],
  });

  const handleSubmit = async () => {
    try {
      await signUp(formData);
    } catch (err) {
      console.error('Sign up error:', err);
    }
  };

  const toggleProfession = (profession: string) => {
    setFormData(prev => ({
      ...prev,
      profession: prev.profession.includes(profession)
        ? prev.profession.filter(p => p !== profession)
        : [...prev.profession, profession]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={formData.displayName}
        onChangeText={(text) => setFormData(prev => ({ ...prev, displayName: text }))}
      />
      <Text style={styles.label}>Profession</Text>
      <View style={styles.professionContainer}>
        {PROFESSIONS.map((profession) => (
          <View key={profession} style={styles.professionItem}>
            <Button
              title={profession}
              onPress={() => toggleProfession(profession)}
              color={formData.profession.includes(profession) ? '#4F46E5' : '#9CA3AF'}
            />
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Skills (comma-separated)"
        value={formData.skills.join(', ')}
        onChangeText={(text) => setFormData(prev => ({
          ...prev,
          skills: text.split(',').map(skill => skill.trim())
        }))}
      />
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
      <Button title="Sign Up" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  professionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  professionItem: {
    margin: 4,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});