import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "@spendify_transactions_v1";

export async function saveTransactions(arr: any[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(arr));
}
export async function loadTransactions(): Promise<any[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
export async function clearTransactions() {
  await AsyncStorage.removeItem(KEY);
}
