import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTransactions } from "@/src/context/TransactionsContext";
import { useThemeApp } from "@/src/context/ThemeContext";

export default function EditExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { transactions, updateTransaction, removeTransaction } = useTransactions();
  const { themeColors, theme } = useThemeApp();
  const isDark = theme === "dark";

  const expense = transactions.find((t) => t.id === id);

  const [title, setTitle] = useState(expense?.title || "");
  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [date, setDate] = useState(expense?.date || "");

  useEffect(() => {
    if (!expense) {
      Alert.alert("Error", "Data tidak ditemukan");
      router.back();
    }
  }, [expense]);

  const handleUpdate = async () => {
    if (!title.trim() || !amount.trim() || !category.trim()) {
      return Alert.alert("Oops", "Semua field wajib diisi");
    }

    await updateTransaction(id!, {
      title,
      amount: parseFloat(amount),
      category,
      date,
    });

    router.back();
  };

  const handleDelete = () => {
    Alert.alert("Hapus Transaksi", "Yakin ingin menghapus transaksi ini?", [
      { text: "Batal" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          await removeTransaction(id!);
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Edit Expense</Text>

      {/* Title */}
      <Text style={[styles.label, { color: themeColors.textSecondary }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Example: Beli Makan"
        placeholderTextColor={themeColors.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.card,
            color: themeColors.text,
            borderColor: themeColors.border,
          },
        ]}
      />

      {/* Amount */}
      <Text style={[styles.label, { color: themeColors.textSecondary }]}>Amount (Rp)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="30000"
        placeholderTextColor={themeColors.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.card,
            color: themeColors.text,
            borderColor: themeColors.border,
          },
        ]}
      />

      {/* Category */}
      <Text style={[styles.label, { color: themeColors.textSecondary }]}>Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Food / Transport / Others"
        placeholderTextColor={themeColors.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.card,
            color: themeColors.text,
            borderColor: themeColors.border,
          },
        ]}
      />

      {/* Date */}
      <Text style={[styles.label, { color: themeColors.textSecondary }]}>Date</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="2025-01-12"
        placeholderTextColor={themeColors.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.card,
            color: themeColors.text,
            borderColor: themeColors.border,
          },
        ]}
      />

      {/* Update Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={handleUpdate}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>Update Expense</Text>
      </TouchableOpacity>

      {/* Delete Button — sama dengan Detail Screen */}
      <TouchableOpacity
        style={[
          styles.deleteButton,
          { backgroundColor: themeColors.danger },
        ]}
        onPress={handleDelete}
      >
        <Text style={[styles.deleteText, { color: "#fff" }]}>Delete</Text>
      </TouchableOpacity>

      {/* Back Button — sama dengan Detail Screen */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={[styles.backText, { color: themeColors.textMuted }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: { fontSize: 14, fontWeight: "600", marginTop: 15 },

  input: {
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
  },

  button: {
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "700" },

  deleteButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  deleteText: { fontSize: 16, fontWeight: "700" },

  backButton: { marginTop: 16, alignItems: "center" },
  backText: { fontSize: 14, fontWeight: "600" },
});
