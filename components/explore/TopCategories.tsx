// components/explore/TopCategories.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@/src/utils/format";

type Item = { name: string; amount: number; percent: number };

type Props = {
  items: Item[]; // sorted desc
};

export default function TopCategories({ items }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>Top Categories</Text>
      <View style={styles.list}>
        {items.map((it, idx) => (
          <View key={it.name} style={styles.row}>
            <View>
              <Text style={{ fontWeight: "700" }}>{idx + 1}. {it.name}</Text>
              <Text style={{ color: "#64748b", marginTop: 4 }}>{formatCurrency(it.amount)}</Text>
            </View>
            <Text style={{ color: "#64748b", fontWeight: "700" }}>{Math.round(it.percent)}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: "#fff", borderRadius: 14, padding: 12, shadowColor: "#000", shadowOpacity: 0.04, elevation: 1 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
});
