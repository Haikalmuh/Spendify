import FloatingAddButton from "@/src/components/FloatingAddButton";
import TransactionCard from "@/src/components/TransactionsCard";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTransactions } from "@/src/context/TransactionsContext";
import EmptyIllustration from "@/assets/images/empty.svg";

export default function HomeScreen() {
  const router = useRouter();
  const { transactions } = useTransactions();

  // --------------------------------------------
  // Hitungan Ringkas untuk Summary & Quick Stats
  // --------------------------------------------

  // Data Bulan Ini
  const thisMonthData = useMemo(() => {
  const now = new Date();
  const filtered = transactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const total = filtered.reduce((sum, t) => sum + t.amount, 0);

  // === RATATA HARIAN SESUAI EXPLORE ===
  // Jumlah hari dalam bulan ini (misal Desember = 31)
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const avgDaily = daysInMonth > 0 ? total / daysInMonth : 0;

  // kategori tertinggi
  const grouped: Record<string, number> = {};
  filtered.forEach((t) => {
    grouped[t.category] = (grouped[t.category] || 0) + t.amount;
  });

  let topCategory = "-";
  if (Object.keys(grouped).length > 0) {
    topCategory = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0][0];
  }

  return {
    total,
    avgDaily,
    count: filtered.length,
    topCategory,
  };
}, [transactions]);


  // Total pengeluaran hari ini
  const todayTotal = useMemo(() => {
    const now = new Date();
    return transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const renderItem = ({ item }: any) => (
    <TransactionCard
      item={item}
      onPress={() =>
        router.push({
          pathname: "/detail/[id]",
          params: { id: item.id },
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.headerTitle}>Hi, Haikal 👋</Text>
      <Text style={styles.subTitle}>Ringkasan Bulan Ini</Text>

      {/* SUMMARY CARD */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Pengeluaran Bulan Ini</Text>
        <Text style={styles.summaryValue}>
          Rp {thisMonthData.total.toLocaleString()}
        </Text>

        {/* Tambahan Total Transaksi */}
        <Text style={styles.summarySubInfo}>
          Total Transaksi: {thisMonthData.count}
        </Text>
      </View>

      {/* QUICK STATS */}
      <View style={styles.quickRow}>
        <View style={styles.quickCard}>
          <Text style={styles.quickLabel}>Total Pengeluaran Hari Ini</Text>
          <Text style={styles.quickValue}>
            Rp {todayTotal.toLocaleString()}
          </Text>
        </View>

        <View style={styles.quickCard}>
          <Text style={styles.quickLabel}>Rata-rata Pengeluaran per Hari</Text>
          <Text style={styles.quickValue}>
            Rp {Math.round(thisMonthData.avgDaily).toLocaleString()}
          </Text>
        </View>

        <View style={styles.quickCard}>
          <Text style={styles.quickLabel}>Kategori Tertinggi</Text>
          <Text style={styles.quickValueSmall}>
            {thisMonthData.topCategory}
          </Text>
        </View>
      </View>

      {/* LIST / EMPTY */}
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyIllustration width={220} height={220} />
          <Text style={styles.emptyText}>Belum ada transaksi</Text>
          <Text style={styles.emptySub}>
            Mulai catat pengeluaranmu hari ini ✨
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FloatingAddButton onPress={() => router.push("/add-expense")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8ff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
  },
  subTitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: "#4F46E5",
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
  },
  summaryLabel: { color: "#e0edff", fontSize: 14 },
  summaryValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 4,
  },

  // tambahan style kecil
  summarySubInfo: {
    marginTop: 6,
    color: "#e0edff",
    fontSize: 13,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  quickLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  quickValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  quickValueSmall: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },

  listContent: {
    paddingBottom: 100,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  emptySub: {
    fontSize: 14,
    marginTop: 6,
    color: "#888",
  },
});
