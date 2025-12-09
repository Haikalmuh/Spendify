import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeApp } from "../context/ThemeContext";
import type { Transaction } from "../types";

type TransactionCardProps = {
  item: Transaction;
  onPress?: (event?: GestureResponderEvent) => void;
};

export default function TransactionCard({
  item,
  onPress,
}: TransactionCardProps) {
  const { themeColors } = useThemeApp();

  const amountText = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(item.amount);

  const iconName = item.amount >= 0 ? "cash-minus" : "cash-plus";
  const iconColor = item.amount >= 0 ? "#EF4444" : "#22C55E";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: themeColors.card, borderColor: themeColors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <MaterialCommunityIcons name={iconName} size={22} color={iconColor} />

        <View style={{ marginLeft: 10 }}>
          <Text
            style={[styles.title, { color: themeColors.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: themeColors.subtext,
              opacity: 0.75, // opsional, biar beda dari title
            }}
          >
            {item.category}
          </Text>
        </View>
      </View>

      <Text
        style={[styles.amount, { color: themeColors.text }]}
        numberOfLines={1}
        ellipsizeMode="head"
      >
        {amountText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,

    borderWidth: 1,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1.5,

    marginBottom: 12,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    maxWidth: 140,
  },

  category: {
    fontSize: 12,
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    maxWidth: 120,
    textAlign: "right",
  },
});
