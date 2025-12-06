import { useTransactions } from "@/src/context/TransactionsContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { transactions, removeTransaction } = useTransactions();

  const tx = transactions.find((t) => t.id === id);

  if (!tx) {
    return (
      <View style={styles.center}>
        <Text>Transaksi tidak ditemukan.</Text>
      </View>
    );
  }

  const handleDelete = async () => {
    await removeTransaction(tx.id);
    router.back(); // Kembali ke Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tx.title}</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>Rp {tx.amount.toLocaleString()}</Text>

        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{tx.category}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{new Date(tx.date).toLocaleString()}</Text>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() =>
          router.push({
            pathname: "/edit/[id]",
            params: { id: tx.id },
          })
        }
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  box: {
    padding: 16,
    backgroundColor: "#f1f5ff",
    borderRadius: 12,
    marginBottom: 30,
  },
  label: { color: "#777", marginTop: 12, fontSize: 12 },
  value: { fontSize: 16, fontWeight: "600", color: "#222" },
  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  backBtn: { marginTop: 16, alignItems: "center" },
  backText: { color: "#555", fontSize: 14 },
  editBtn: {
    backgroundColor: "#4F46E5",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
