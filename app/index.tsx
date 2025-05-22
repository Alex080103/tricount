import { Image } from 'expo-image';
import { View, Platform, StyleSheet, TextInput, TouchableOpacity,ScrollView, Alert } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUpRedirect = () => {
    // Redirige vers la page d'inscription
    router.push('/sign-in');
  };

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Erreur', 'Veuillez remplir les deux champs.');
    } else {
      router.push('/home');
    }
  };
  return (
  <View style={styles.body}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Trisum</ThemedText>
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
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <ThemedText style={styles.linkText}>
          Vous ne possédez pas de compte ?{' '}
          <ThemedText style={styles.link} onPress={handleSignUpRedirect}>Inscrivez-vous</ThemedText>
        </ThemedText>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText} onPress={handleLogin}>Se connecter</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  title : {
    marginBottom:40,
    padding:10,
    backgroundColor:'#212121',
    textAlign:'center',
  },
  body : {
    backgroundColor:'#212121',
    minHeight:850,
  },
  container: {
    flex:1,
    padding: 16,
    justifyContent:'center',
    backgroundColor:'#212121',
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
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 14,
  },
  link: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#1E90FF', //Si positif #1E90FF  #525252
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
