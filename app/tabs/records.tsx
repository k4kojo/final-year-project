import TopHeader from "@/components/top-header.component";
import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
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
  const { theme } = useThemeContext();
  const themeColors = Colors[theme];
  const brand = Colors.brand;

  const icon =
    item.type === "consultation" ? (
      <Ionicons name="document-text-outline" size={24} color={brand.primary} />
    ) : (
      <Ionicons name="flask-outline" size={24} color={brand.primary} />
    );

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
        },
      ]}
    >
      <View style={styles.cardLeft}>
        {icon}
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.recordTitle, { color: themeColors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.recordDate, { color: themeColors.subText }]}>
            {item.date}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor: themeColors.background },
        ]}
      >
        <Text style={[styles.actionText, { color: brand.primary }]}>
          {item.type === "consultation" ? "Download" : "View"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Records = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useThemeContext();
  const themeColors = Colors[theme];
  const brand = Colors.brand;

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
        placeholderTextColor={themeColors.placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[
          styles.searchInput,
          {
            backgroundColor: themeColors.card,
            color: themeColors.text,
            borderColor: themeColors.border,
          },
        ]}
      />
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            borderColor: themeColors.border,
            backgroundColor: themeColors.card,
          },
        ]}
      >
        <Ionicons name="filter-outline" size={20} color={brand.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <TopHeader screen="records" />
      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) =>
          item.type === "header" ? (
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              {item.title}
            </Text>
          ) : (
            <RecordCard item={item} />
          )
        }
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default Records;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
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
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
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
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionText: {
    fontWeight: "500",
  },
});
