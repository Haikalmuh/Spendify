// components/explore/EmptyState.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EmptyIllustration from "@/assets/images/empty.svg";

export default function EmptyState() {
  return (
    <View style={styles.center}>
      <EmptyIllustration width={220} height={220} />
      <Text style={styles.title}>Mulai catat pengeluaranmu hari ini</Text>
      <Text style={styles.sub}>Tambahkan transaksi pertama melalui tombol +</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", paddingVertical: 30 },
  title: { fontSize: 18, fontWeight: "700", marginTop: 6, color: "#0f172a" },
  sub: { color: "#64748b", marginTop: 6 },
});
