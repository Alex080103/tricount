import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Tabs: { id: number; name: string }[] = [
  { id: 0, name: "Dépenses" },
  { id: 1, name: "Équilibre" },
];

// Données d'exemple pour l'équilibre
const balanceData = [
  { id: 1, name: "User", amount: -18.75, initials: "U" },
  { id: 2, name: "User", amount: 16.75, initials: "U" },
  { id: 3, name: "User", amount: -8.75, initials: "U" },
];

// Données d'exemple pour les dépenses
const expenseData = [
  {
    id: 1,
    label: "Label",
    user: "User",
    amount: 16.7,
    date: "Category Item",
    participants: "Participants du groupe",
    initials: "U",
  },
];

export default function Group() {
  const [activeTab, setActiveTab] = useState<number>(0);

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

  const renderExpenseItem = ({ item }: { item: (typeof expenseData)[0] }) => (
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
                  25€
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
                  30€
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
                  Tu dois encore 18.75 €
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
              data={balanceData}
              renderItem={renderBalanceItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    gap: 8,
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
});
