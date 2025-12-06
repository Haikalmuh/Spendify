// components/explore/WeeklyBarChart.tsx
import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { formatCurrency } from "@/src/utils/format";

const screenWidth = Dimensions.get("window").width;

type Props = {
  labels: string[];
  data: number[];
  title?: string;
};

export default function WeeklyBarChart({ labels, data, title = "Pengeluaran 7 hari" }: Props) {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59,130,246, ${opacity})`,
    labelColor: () => "#94a3b8",
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <BarChart
        data={{ labels, datasets: [{ data }] }}
        width={screenWidth - 40}
        height={180}
        chartConfig={chartConfig}
        fromZero
        yAxisLabel="Rp "
        yAxisSuffix=""
        style={{ borderRadius: 12, marginTop: 8 }}
        showValuesOnTopOfBars
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 12, marginBottom: 12 },
  title: { fontWeight: "700", color: "#0f172a" },
});
