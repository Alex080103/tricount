import FloatingAddButton from "@/components/FloatingAddButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from 'expo-router';

const router = useRouter();

const Tabs: { id: number; name: string }[] = [
  { id: 0, name: "Dépenses" },
  { id: 1, name: "Équilibre" },
];

// Interface pour les dépenses
interface Expense {
  id: number;
  label: string;
  user: string;
  amount: number;
  date: string;
  participants: string;
  initials: string;
}

// Interface pour le formulaire de nouvelle dépense
interface NewExpenseForm {
  label: string;
  amount: string;
  date: string;
  participants: string;
}

export default function Group() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [expenseData, setExpenseData] = useState<Expense[]>([
    {
      id: 1,
      label: "Miam",
      user: "Louis",
      amount: 16.7,
      date: new Date("2025-05-21").toLocaleDateString(),
      participants: "Tous",
      initials: "L",
    },
  ]);

  // État pour la modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newExpense, setNewExpense] = useState<NewExpenseForm>({
    label: "",
    amount: "",
    date: "",
    participants: "",
  });
  const [totalExpenses, setTotalExpenses] = useState(16.7);
  const [myTotalExpenses, setMyTotalExpenses] = useState(16.7);
  const [toPay, setToPay] = useState<{ payed: boolean; value: number }>({
    payed: false,
    value: 0,
  });

  const [balance, setBalance] = useState([
    { id: 0, name: "Louis", amount: -18.75, initials: "L" },
    { id: 1, name: "Loïc", amount: 16.75, initials: "L" },
    { id: 2, name: "Alexandre", amount: 0, initials: "A" },
  ]);
  // Données d'exemple pour l'équilibre

  // Use effect qui modifie les valeurs a chaque changement de totalExpense
  useEffect(() => {
    const newBalance = balance.map((item) => {
      if (item.name == "Alexandre") {
        setToPay({
          payed: toPay.payed,
          value: totalExpenses / balance.length - myTotalExpenses,
        });
      }
      return {
        id: item.id,
        name: item.name,
        amount:
          totalExpenses / balance.length -
          (item.name == "Alexandre" ? myTotalExpenses : 0),
        initials: item.initials,
      };
    });
    setBalance([...newBalance]);
  }, [totalExpenses]);

  const handleAddSpending = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    // Reset du formulaire
    setNewExpense({
      label: "",
      amount: "",
      date: "",
      participants: "",
    });
  };
  const redirection = () => {
    router.push('/share');
  }
  const handleSaveExpense = () => {
    if (Number.isNaN(newExpense.amount)) {
      alert("Merci de rentrer un nombre valide");
    }
    setTotalExpenses((prev) => {
      return prev + Number.parseFloat(newExpense.amount);
    });
    setMyTotalExpenses((prev) => {
      return prev + Number.parseFloat(newExpense.amount);
    });
    // Création de la nouvelle dépense
    const expense: Expense = {
      id: expenseData.length + 1,
      label: newExpense.label,
      user: "Alexandre", // Pour l'instant, on utilise "User" par défaut
      amount: parseFloat(newExpense.amount),
      date: new Date().toLocaleDateString(),
      participants: "Tous",
      initials: "A", // Pour l'instant, on utilise "U" par défaut
    };
    // Ajout à la liste des dépenses
    setExpenseData([...expenseData, expense]);

    // Fermeture de la modal
    handleCloseModal();

    // Message de confirmation
    Alert.alert("Succès", "Dépense ajoutée avec succès!");
  };

  const renderBalanceItem = ({ item }: { item: (typeof balanceData)[0] }) => (
    <View style={styles.balanceItem}>
      <View style={styles.flexContainer}>
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        <Text style={[styles.whiteColor, styles.userName]}>{item.name}</Text>
      </View>
      
      <Text
        style={[
          styles.amountText,
          item.amount < 0 ? styles.negativeAmount : styles.positiveAmount,
        ]}
      >
        {item.amount < 0
          ? `${Math.abs(item.amount).toFixed(2)}€`
          : `+ ${item.amount.toFixed(2)}€`}
      </Text>
    </View>
  );

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      
      <View style={styles.expenseHeader}>
        <View style={styles.flexContainer}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>{item.initials}</Text>
          </View>
          <View style={styles.expenseInfo}>
            <Text style={[styles.whiteColor, styles.expenseLabel]}>
              {item.label}
            </Text>
            <Text style={[styles.whiteColor, styles.expenseUser]}>
              {item.user}
            </Text>
          </View>
        </View>
        <Text style={[styles.whiteColor, styles.expenseAmount]}>
          {item.amount.toFixed(2)}€
        </Text>
      </View>
      <View style={styles.expenseDetails}>
        <View style={styles.expenseDetailRow}>
          <MaterialIcons name="calendar-today" size={16} color="#999" />
          <Text style={[styles.grayColor, styles.expenseDetailText]}>
            {item.date}
          </Text>
        </View>
        <View style={styles.expenseDetailRow}>
          <MaterialIcons name="group" size={16} color="#999" />
          <Text style={[styles.grayColor, styles.expenseDetailText]}>
            {item.participants}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <AntDesign name="sharealt" size={24} color="white" style={styles.icone} onPress={redirection}/>
      <View style={styles.iconContainer}>
        <FontAwesome name="shopping-cart" size={42} color="#387FF6" />
      </View>
      <Text style={styles.title}>Titre du groupe</Text>
      <FlatList
        data={Tabs}
        contentContainerStyle={styles.tabulations}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveTab(item.id)}
            style={[
              // If is first item apply dedicated style
              item.id == 0
                ? styles.firstTab
                : // If it last apply dedicated style
                item.id == Tabs.length - 1
                ? styles.lastTab
                : "",
              item.id == activeTab ? styles.activeTab : styles.unactiveTab,
              styles.tab,
            ]}
          >
            <Text style={[styles.whiteColor, styles.fontSize18]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {activeTab === 0 ? (
        /* Dépenses */
        <View>
          <View style={[styles.flexContainer, styles.tabulationHeader]}>
            <View style={[styles.flexContainer, styles.gap8]}>
              <View style={styles.iconCircleContainer}>
                <MaterialIcons name="attach-money" size={24} color="white" />
              </View>
              <View>
                <Text style={[styles.whiteColor, styles.weigthLight]}>
                  Mes dépenses
                </Text>
                <Text
                  style={[
                    styles.whiteColor,
                    styles.weigthLight,
                    styles.textCenter,
                  ]}
                >
                  {myTotalExpenses.toFixed(2)}€
                </Text>
              </View>
            </View>
            <View style={[styles.flexContainer, styles.gap8]}>
              <Ionicons name="wallet-outline" size={28} color="white" />
              <View>
                <Text style={[styles.whiteColor, styles.weigthLight]}>
                  Total des dépenses
                </Text>
                <Text
                  style={[
                    styles.whiteColor,
                    styles.weigthLight,
                    styles.textCenter,
                  ]}
                >
                  {totalExpenses.toFixed(2)}€
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.whitebar}></View>

          <View style={styles.expensesList}>
            <FlatList
              data={expenseData}
              renderItem={renderExpenseItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      ) : (
        /* Équilibre */
        <View>
          <View style={[styles.flexContainer, styles.tabulationHeader]}>
            <View style={[styles.flexContainer, styles.gap8]}>
              <View style={styles.balanceToggle}>
                <Text style={[styles.whiteColor, styles.fontSize12]}>
                  {!toPay.payed
                    ? "Tu dois encore " + toPay.value.toFixed(2) * -1 + " €"
                    : "Tu as reglé " + toPay.value.toFixed(2) * -1 + " €"}
                </Text>
                <View style={styles.toggleSwitch}>
                  <View style={styles.toggleButton}></View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.whitebar}></View>

          <View style={styles.balanceList}>
            <FlatList
              data={balance}
              renderItem={renderBalanceItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      )}

      <FloatingAddButton onPress={handleAddSpending} />

      {/* Modal pour ajouter une dépense */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter une dépense</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Libellé *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Restaurant, Courses..."
                  placeholderTextColor="#999"
                  value={newExpense.label}
                  onChangeText={(text) =>
                    setNewExpense({ ...newExpense, label: text })
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Montant (€) *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={newExpense.amount}
                  onChangeText={(text) =>
                    setNewExpense({ ...newExpense, amount: text })
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Catégorie *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Courses, voyages, alimentation"
                  placeholderTextColor="#999"
                  value={newExpense.date}
                  onChangeText={(text) =>
                    setNewExpense({ ...newExpense, date: text })
                  }
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCloseModal}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveExpense}
              >
                <Text style={styles.saveButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    gap: 8,
  },
  icone: {
    position:"absolute",
    right:40,
    top:40,
  },
  iconContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    color: "white",
    textAlign: "center",
    padding: 4,
  },
  tabulations: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  // Tailwind
  whiteColor: {
    color: "white",
  },
  grayColor: {
    color: "#999",
  },
  fontSize18: {
    fontSize: 18,
  },
  fontSize12: {
    fontSize: 12,
  },
  gap8: {
    gap: 8,
  },
  weigthLight: {
    fontWeight: "100",
  },
  textCenter: {
    textAlign: "center",
  },
  tabulationHeader: {
    gap: 24,
    marginTop: 12,
  },
  // Specific cases
  tab: {
    padding: 6,
    paddingInline: 28,
    display: "flex",
  },
  firstTab: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
  },
  lastTab: {
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
  },
  unactiveTab: {
    backgroundColor: "#787878",
  },
  activeTab: {
    backgroundColor: "#387FF6",
  },
  iconCircleContainer: {
    padding: 2,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
  },
  whitebar: {
    width: 250,
    borderTopWidth: 1,
    borderColor: "white",
    marginBlock: 12,
    marginInline: "auto",
  },
  // Add Spending Button styles
  addButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  addSpendingButton: {
    backgroundColor: "#387FF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  addSpendingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  // Balance specific styles
  balanceToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleSwitch: {
    width: 40,
    height: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleButton: {
    width: 16,
    height: 16,
    backgroundColor: "white",
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  balanceList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  balanceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  negativeAmount: {
    color: "#FF6B6B",
  },
  positiveAmount: {
    color: "#4CAF50",
  },
  // Expense specific styles
  expensesList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  expenseItem: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  expenseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  expenseInfo: {
    marginLeft: 12,
    flex: 1,
  },
  expenseLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  expenseUser: {
    fontSize: 14,
    opacity: 0.8,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseDetails: {
    gap: 4,
  },
  expenseDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  expenseDetailText: {
    fontSize: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    minHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "white",
    borderWidth: 1,
    borderColor: "#444",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#666",
  },
  saveButton: {
    backgroundColor: "#387FF6",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
