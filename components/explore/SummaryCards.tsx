// components/explore/SummaryCards.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@/src/utils/format";

type Props = {
  today: number;
  week: number;
  month: number;
  count: number;
  avgPerDay: number;
};

export default function SummaryCards({ today, week, month, count, avgPerDay }: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.card, { flex: 1, marginRight: 8 }]}>
        <Text style={styles.cardTitle}>This month</Text>
        <Text style={styles.amount}>{formatCurrency(month)}</Text>
        <Text style={styles.muted}>{count} transaksi</Text>
      </View>

      <View style={[styles.card, { width: 140 }]}>
        <Text style={styles.cardTitle}>Rata-rata Pengeluaran per Hari (Bulan Ini)</Text>
        <Text style={styles.amountSmall}>{formatCurrency(avgPerDay)}</Text>
        <Text style={styles.muted}>Today {formatCurrency(today)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { color: "#475569", fontSize: 12, fontWeight: "700" },
  amount: { fontSize: 18, fontWeight: "800", marginTop: 6, color: "#0f172a" },
  amountSmall: { fontSize: 16, fontWeight: "700", marginTop: 6, color: "#0f172a" },
  muted: { fontSize: 12, color: "#64748b", marginTop: 6 },
});
