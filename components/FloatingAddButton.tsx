import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FloatingAddButton = ({ onPress }: { onPress: any }) => {
  return (
    <View style={styles.floatingButtonContainer}>
      <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.floatingButtonLabel}>Ajouter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: "-30%",
    right: "40%",
    alignItems: "center",
    zIndex: 1000,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#387FF6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  floatingButtonLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});

export default FloatingAddButton;
