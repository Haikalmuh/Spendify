import { useTransactions } from "@/src/context/TransactionsContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeApp } from "@/src/context/ThemeContext";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { transactions, removeTransaction } = useTransactions();
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  const tx = transactions.find((t) => t.id === id);

  if (!tx) {
    return (
      <View style={[styles.center, { backgroundColor: themeColors.background }]}>
        <Text style={{ color: themeColors.text }}>Transaksi tidak ditemukan.</Text>
      </View>
    );
  }

  const handleDelete = async () => {
    await removeTransaction(tx.id);
    router.back();
  };

  const colors = {
    bg: themeColors.background,
    card: themeColors.card,
    text: themeColors.text,
    muted: themeColors.textMuted ?? (isDark ? "#94a3b8" : "#64748b"),
    border: themeColors.border,
    primary: themeColors.primary,
    danger: themeColors.danger,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>{tx.title}</Text>

      <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.muted }]}>Amount</Text>
        <Text style={[styles.value, { color: colors.text }]}>Rp {tx.amount.toLocaleString()}</Text>

        <Text style={[styles.label, { color: colors.muted }]}>Category</Text>
        <Text style={[styles.value, { color: colors.text }]}>{tx.category}</Text>

        <Text style={[styles.label, { color: colors.muted }]}>Date</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {new Date(tx.date).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.editBtn, { backgroundColor: colors.primary }]}
        onPress={() =>
          router.push({
            pathname: "/edit/[id]",
            params: { id: tx.id },
          })
        }
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.deleteBtn, { backgroundColor: colors.danger }]}
        onPress={handleDelete}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={[styles.backText, { color: colors.muted }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  box: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
  },
  label: { marginTop: 12, fontSize: 12 },
  value: { fontSize: 16, fontWeight: "600" },
  editBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  editText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  deleteBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  backBtn: { marginTop: 16, alignItems: "center" },
  backText: { fontSize: 14 },
});
