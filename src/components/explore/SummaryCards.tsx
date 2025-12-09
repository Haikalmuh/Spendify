// components/explore/SummaryCards.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@/src/utils/format";
import { useThemeApp } from "@/src/context/ThemeContext";

type Props = {
  today: number;
  week: number;
  month: number;
  count: number;
  avgPerDay: number;
};

export default function SummaryCards({ today, week, month, count, avgPerDay }: Props) {
  const { theme, themeColors } = useThemeApp();
  const isDark = theme === "dark";

  return (
    <View style={styles.row}>
      {/* Card 1 */}
      <View
        style={[
          styles.card,
          { flex: 1, marginRight: 8, backgroundColor: themeColors.card, shadowOpacity: isDark ? 0.15 : 0.06 },
        ]}
      >
        <Text style={[styles.cardTitle, { color: themeColors.textMuted }]}>This month</Text>
        <Text style={[styles.amount, { color: themeColors.text }]}>{formatCurrency(month)}</Text>
        <Text style={[styles.muted, { color: themeColors.textMuted }]}>
          {count} transaksi
        </Text>
      </View>

      {/* Card 2 */}
      <View
        style={[
          styles.card,
          { width: 140, backgroundColor: themeColors.card, shadowOpacity: isDark ? 0.15 : 0.06 },
        ]}
      >
        <Text style={[styles.cardTitle, { color: themeColors.textMuted }]}>
          Rata-rata Pengeluaran per Hari (Bulan Ini)
        </Text>
        <Text style={[styles.amountSmall, { color: themeColors.text }]}>
          {formatCurrency(avgPerDay)}
        </Text>

        <Text style={[styles.muted, { color: themeColors.textMuted }]}>
          Today {formatCurrency(today)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginBottom: 12 },
  card: {
    padding: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 12, fontWeight: "700" },
  amount: { fontSize: 18, fontWeight: "800", marginTop: 6 },
  amountSmall: { fontSize: 16, fontWeight: "700", marginTop: 6 },
  muted: { fontSize: 12, marginTop: 6 },
});
