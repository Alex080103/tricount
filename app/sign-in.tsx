import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Vérifier si tous les champs sont remplis
  const isFormValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.appTitle}>
          Titre de l'appli
        </ThemedText>

        <ThemedText type="subtitle" style={styles.label}>
          Nom d'utilisateur
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom d'utilisateur"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <ThemedText type="subtitle" style={styles.label}>
          E-mail
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre e-mail"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <ThemedText type="subtitle" style={styles.label}>
          Mot de Passe
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <ThemedText style={styles.linkText}>
          Vous possédez déjà un compte ?{' '}
          <ThemedText style={styles.link}>Connectez vous</ThemedText>
        </ThemedText>

        <TouchableOpacity style={styles.button(isFormValid)} disabled={!isFormValid}>
          <ThemedText style={styles.buttonText}>S'inscrire</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#353636',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
    minHeight: 1000,
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 54,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#C0C0C0',
    borderRadius: 25,
    padding: 12,
    marginBottom: 16,
    color: '#000',
    fontSize: 16,
  },
  linkText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 14,
  },
  link: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  button: (isValid) => ({
    backgroundColor: isValid ? '#1E90FF' : '#A0A0A0',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  }),
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});