import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTransactions } from "@/src/context/TransactionsContext";

export default function EditExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { transactions, updateTransaction, removeTransaction } = useTransactions();

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
    <View style={styles.container}>
      <Text style={styles.title}>Edit Expense</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Example: Beli Makan"
      />

      <Text style={styles.label}>Amount (Rp)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
        placeholder="30000"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={styles.input}
        placeholder="Food / Transport / Others"
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        style={styles.input}
        placeholder="2025-01-12"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 15 },
  input: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  deleteButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    borderRadius: 10,
  },
  deleteText: { color: "#b91c1c", fontWeight: "bold" },
});
