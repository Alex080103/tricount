import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ShareScreen = () => {
  // Données du groupe (exemple)
  const groupData = {
    title: "Titre du groupe",
    totalExpenses: "30€",
    myExpenses: "25€",
    shareUrl: "https://tricount.com/group/abc123",
    groupCode: "ABC123",
  };

  // Fonction pour partager
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Rejoins mon groupe Tricount "${groupData.title}" avec le code: ${groupData.groupCode}\n\nOu utilise ce lien: ${groupData.shareUrl}`,
        url: groupData.shareUrl,
        title: "Partager le groupe Tricount",
      });
    } catch (error) {
      Alert.alert("Erreur", "Impossible de partager le groupe");
    }
  };

  // Fonction pour copier le code
  const handleCopyCode = () => {
    // Dans une vraie app, utiliser Clipboard.setString()
    Alert.alert(
      "Code copié!",
      `Code ${groupData.groupCode} copié dans le presse-papier`
    );
  };

  // Composant QR Code simple (placeholder)
  const QRCodePlaceholder = () => (
    <View style={styles.qrCode}>
      <View style={styles.qrPattern}>
        {[...Array(8)].map((_, i) => (
          <View key={i} style={styles.qrRow}>
            {[...Array(8)].map((_, j) => (
              <View
                key={j}
                style={[
                  styles.qrCell,
                  (i + j) % 2 === 0 ? styles.qrCellDark : styles.qrCellLight,
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.qrLabel}>Scanner pour rejoindre</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2d2d2d" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partager le groupe</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Group Info */}
      <View style={styles.groupInfo}>
        <View style={styles.groupIcon}>
          <Ionicons name="people" size={24} color="#4A90E2" />
        </View>
        <Text style={styles.groupTitle}>{groupData.title}</Text>
        <Text style={styles.groupSubtitle}>
          Total: {groupData.totalExpenses} • Mes dépenses:{" "}
          {groupData.myExpenses}
        </Text>
      </View>

      {/* QR Code Section */}
      <View style={styles.qrSection}>
        <QRCodePlaceholder />
      </View>

      {/* Share Code Section */}
      <View style={styles.codeSection}>
        <Text style={styles.codeLabel}>Code du groupe</Text>
        <TouchableOpacity style={styles.codeContainer} onPress={handleCopyCode}>
          <Text style={styles.codeText}>{groupData.groupCode}</Text>
          <Ionicons name="copy-outline" size={20} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.codeHint}>Appuyer pour copier</Text>
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-outline" size={20} color="white" />
        <Text style={styles.shareButtonText}>Partager le groupe</Text>
      </TouchableOpacity>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Comment inviter des amis ?</Text>
        <View style={styles.instructionItem}>
          <Ionicons name="qr-code-outline" size={16} color="#999" />
          <Text style={styles.instructionText}>Scanner le QR code</Text>
        </View>
        <View style={styles.instructionItem}>
          <Ionicons name="keypad-outline" size={16} color="#999" />
          <Text style={styles.instructionText}>Entrer le code du groupe</Text>
        </View>
        <View style={styles.instructionItem}>
          <Ionicons name="link-outline" size={16} color="#999" />
          <Text style={styles.instructionText}>
            Utiliser le lien de partage
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d2d2d",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  placeholder: {
    width: 34,
  },
  groupInfo: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  groupIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#404040",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  groupSubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  qrSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  qrCode: {
    alignItems: "center",
  },
  qrPattern: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  qrRow: {
    flexDirection: "row",
    flex: 1,
  },
  qrCell: {
    flex: 1,
    margin: 0.5,
  },
  qrCellDark: {
    backgroundColor: "#000",
  },
  qrCellLight: {
    backgroundColor: "#fff",
  },
  qrLabel: {
    fontSize: 12,
    color: "#999",
  },
  codeSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  codeLabel: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
    fontWeight: "600",
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#404040",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 8,
  },
  codeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 2,
    marginRight: 15,
  },
  codeHint: {
    fontSize: 12,
    color: "#999",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 20,
  },
  shareButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  instructions: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  instructionsTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    marginBottom: 15,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: "#999",
    marginLeft: 12,
  },
});

export default ShareScreen;
