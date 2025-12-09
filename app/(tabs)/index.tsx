import FloatingAddButton from "@/src/components/FloatingAddButton";
import TransactionCard from "@/src/components/TransactionsCard";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTransactions } from "@/src/context/TransactionsContext";
import EmptyIllustration from "@/assets/images/empty.svg";
import { useThemeApp } from "@/src/context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { transactions } = useTransactions();
  const { themeColors, theme } = useThemeApp();

  // ----------------------------
  // DATA BULAN INI
  // ----------------------------
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

    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const avgDaily = daysInMonth > 0 ? total / daysInMonth : 0;

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

  // ----------------------------
  // TOTAL PENGELUARAN HARI INI
  // ----------------------------
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

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      {/* HEADER */}
      <Text style={[styles.headerTitle, { color: themeColors.text }]}>
        Hi, Haikal 👋
      </Text>
      <Text style={[styles.subTitle, { color: themeColors.text }]}>
        Ringkasan Bulan Ini
      </Text>

      {/* SUMMARY CARD */}
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor:
              theme === "light" ? "#4F46E5" : "#312E81", // versi gelap
          },
        ]}
      >
        <Text style={[styles.summaryLabel]}>Total Pengeluaran Bulan Ini</Text>
        <Text style={styles.summaryValue}>
          Rp {thisMonthData.total.toLocaleString()}
        </Text>

        <Text style={styles.summarySubInfo}>
          Total Transaksi: {thisMonthData.count}
        </Text>
      </View>

      {/* QUICK STATS */}
      <View style={styles.quickRow}>
        <View
          style={[
            styles.quickCard,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={[styles.quickLabel, { color: themeColors.text }]}>
            Total Pengeluaran Hari Ini
          </Text>
          <Text style={[styles.quickValue, { color: themeColors.text }]}>
            Rp {todayTotal.toLocaleString()}
          </Text>
        </View>

        <View
          style={[
            styles.quickCard,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={[styles.quickLabel, { color: themeColors.text }]}>
            Rata-rata Pengeluaran per Hari
          </Text>
          <Text style={[styles.quickValue, { color: themeColors.text }]}>
            Rp {Math.round(thisMonthData.avgDaily).toLocaleString()}
          </Text>
        </View>

        <View
          style={[
            styles.quickCard,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={[styles.quickLabel, { color: themeColors.text }]}>
            Kategori Tertinggi
          </Text>
          <Text
            style={[styles.quickValueSmall, { color: themeColors.text }]}
          >
            {thisMonthData.topCategory}
          </Text>
        </View>
      </View>

      {/* LIST / EMPTY */}
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyIllustration width={220} height={220} />

          <Text style={[styles.emptyText, { color: themeColors.text }]}>
            Belum ada transaksi
          </Text>
          <Text style={[styles.emptySub, { color: themeColors.text }]}>
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
    marginBottom: 20,
  },

  summaryCard: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
  },
  summaryLabel: { color: "#e0edff", fontSize: 14 },
  summaryValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 4,
  },

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
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  quickLabel: {
    fontSize: 12,
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
  },
});
