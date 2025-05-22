import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("Guillaume Poucet");
  const [nickname, setNickname] = useState("PouGui");
  const [iban, setIban] = useState("");

  const [editName, setEditName] = useState(false);
  const [editNickname, setEditNickname] = useState(false);
  const [editIban, setEditIban] = useState(false);

  const handleLogout = () => {
    console.log("Déconnexion");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>guillaume.poucet@gmail.com</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => setEditName(!editName)}
        >
          <View>
            <Text style={styles.itemLabel}>Nom</Text>
            <Text style={styles.itemValue}>{name}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        {editName && (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Modifier votre nom"
            placeholderTextColor="#888"
          />
        )}

        <TouchableOpacity
          style={styles.item}
          onPress={() => setEditNickname(!editNickname)}
        >
          <View>
            <Text style={styles.itemLabel}>Surnom</Text>
            <Text style={styles.itemValue}>{nickname}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        {editNickname && (
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="Modifier votre surnom"
            placeholderTextColor="#888"
          />
        )}

        <TouchableOpacity
          style={styles.item}
          onPress={() => setEditIban(!editIban)}
        >
          <View>
            <Text style={styles.itemLabel}>IBAN</Text>
            <Text style={styles.itemValue}>{iban}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        {editIban && (
          <TextInput
            style={styles.input}
            value={iban}
            onChangeText={setIban}
            placeholder="FR76 XXXX XXXX XXXX XXXX"
            placeholderTextColor="#888"
          />
        )}
      </View>

      <View style={styles.logoutWrapper}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c0c0c",
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
    fontWeight: "bold",
  },
  email: {
    color: "#fff",
    marginTop: 4,
  },
  section: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    marginBottom: 20,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLabel: {
    color: "#fff",
    fontSize: 14,
  },
  itemValue: {
    color: "#fff",
    fontSize: 15,
    flexShrink: 1,
    textAlign: "right",
  },
  chevron: {
    color: "#fff",
    fontSize: 22,
    transform: [{ rotate: "90deg" }],
  },
  input: {
    backgroundColor: "#2c2c2e",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  logoutWrapper: {
    marginTop: 40,
    alignItems: "center",
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#E63224",
    backgroundColor: "#fff",
  },
  logoutText: {
    color: "#E63224",
    fontSize: 14,
    fontWeight: "600",
  },
});
