// components/explore/SpendingLineChart.tsx
import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { formatCurrency } from "@/src/utils/format";

const screenWidth = Dimensions.get("window").width;

type Props = {
  labels: string[]; // e.g. ['1', '5', '10'...]
  data: number[]; // same length
  title?: string;
};

export default function SpendingLineChart({ labels, data, title = "Monthly Trend" }: Props) {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(99,102,241, ${opacity})`, // purple accent
    labelColor: () => "#94a3b8",
    propsForDots: { r: "3" },
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{ labels, datasets: [{ data }] }}
        width={screenWidth - 40}
        height={200}
        chartConfig={chartConfig}
        bezier
        fromZero
        yAxisLabel="Rp "
        yAxisSuffix=""
        style={{ borderRadius: 12, marginTop: 8 }}
        formatYLabel={(y) => formatCurrency(Number(y))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 12, marginBottom: 12 },
  title: { fontWeight: "700", color: "#0f172a" },
});
