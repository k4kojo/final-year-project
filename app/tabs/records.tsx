import TopHeader from "@/components/top-header.component";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type RecordItem = {
  id: string;
  title: string;
  date?: string;
  type: "lab" | "prescription" | "consultation" | "header";
};

const labResults: RecordItem[] = [
  { id: "lab-header", title: "Lab Results", type: "header" },
  { id: "1", title: "Blood Test", date: "May 20, 2024", type: "lab" },
  { id: "2", title: "X-Ray", date: "Feb 9, 2024", type: "lab" },
];

const prescriptions: RecordItem[] = [
  { id: "prescription-header", title: "Prescriptions", type: "header" },
  { id: "3", title: "Amoxicillin", date: "Apr 10, 2024", type: "prescription" },
];

const consultationNotes: RecordItem[] = [
  { id: "consultation-header", title: "Consultation Notes", type: "header" },
  {
    id: "4",
    title: "Follow-up Visit",
    date: "May 20, 2024",
    type: "consultation",
  },
];

const allRecords: RecordItem[] = [
  ...labResults,
  ...prescriptions,
  ...consultationNotes,
];

const RecordCard = ({ item }: { item: RecordItem }) => {
  const icon =
    item.type === "consultation" ? (
      <Ionicons name="document-text-outline" size={24} color="#6366f1" />
    ) : (
      <Ionicons name="flask-outline" size={24} color="#8b5cf6" />
    );

  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        {icon}
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.recordTitle}>{item.title}</Text>
          <Text style={styles.recordDate}>{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>
          {item.type === "consultation" ? "Download" : "View"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Records = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return allRecords;
    return allRecords.filter(
      (item) =>
        item.type === "header" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderHeader = () => (
    <View style={styles.searchRow}>
      <TextInput
        placeholder="Search records..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter-outline" size={20} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopHeader screen="records" />
      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) =>
          item.type === "header" ? (
            <Text style={styles.sectionTitle}>{item.title}</Text>
          ) : (
            <RecordCard item={item} />
          )
        }
        keyboardShouldPersistTaps="always" // ✅ Important!
        removeClippedSubviews={false} // Optional: Prevents unmounting of off-screen items
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordTitle: {
    fontWeight: "600",
    fontSize: 15,
  },
  recordDate: {
    fontSize: 13,
    color: "#555",
  },
  actionButton: {
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionText: {
    color: "#2563eb",
    fontWeight: "500",
  },
});

export default Records;
