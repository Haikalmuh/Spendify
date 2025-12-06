// components/explore/CategoryPieChart.tsx
import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { formatCurrency } from "@/src/utils/format";

const screenWidth = Dimensions.get("window").width;

type PieItem = { name: string; population: number; color: string };

type Props = {
  data: PieItem[];
  title?: string;
};

export default function CategoryPieChart({ data, title = "Pengeluaran per Kategori" }: Props) {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    labelColor: () => "#64748b",
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {data.length === 0 ? (
        <Text style={{ color: "#64748b", marginTop: 8 }}>Belum ada data kategori</Text>
      ) : (
        <PieChart
          data={data.map((d) => ({ name: d.name, population: d.population, color: d.color }))}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 12, marginBottom: 12 },
  title: { fontWeight: "700", color: "#0f172a" },
});
