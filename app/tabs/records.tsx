import TopHeader from "@/components/top-header.component";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type RecordItem = {
  id: string;
  title: string;
  date: string;
  type: "lab" | "prescription" | "consultation";
};

const labResults: RecordItem[] = [
  { id: "1", title: "Blood Test", date: "May 20, 2024", type: "lab" },
  { id: "2", title: "X-Ray", date: "Feb 9, 2024", type: "lab" },
];

const prescriptions: RecordItem[] = [
  { id: "3", title: "Blood Test", date: "May 20, 2024", type: "prescription" },
  { id: "4", title: "X-Ray", date: "Feb 9, 2024", type: "prescription" },
];

const consultationNotes: RecordItem[] = [
  { id: "5", title: "Blood Test", date: "May 20, 2024", type: "consultation" },
  { id: "6", title: "X-Ray", date: "Feb 9, 2024", type: "consultation" },
];

const RecordCard = ({
  item,
  actionLabel,
}: {
  item: RecordItem;
  actionLabel: string;
}) => {
  const icon =
    item.type === "consultation" ? (
      <Ionicons name="document-text-outline" size={24} color="#6366f1" />
    ) : (
      <MaterialCommunityIcons name="flask-outline" size={24} color="#8b5cf6" />
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
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};
const Records = () => {
  return (
    <View style={styles.container}>
      <TopHeader screen="records" />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Lab Results</Text>
        <FlatList
          data={labResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecordCard item={item} actionLabel="View" />
          )}
        />

        <Text style={styles.sectionTitle}>Prescriptions</Text>
        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecordCard item={item} actionLabel="View" />
          )}
        />

        <Text style={styles.sectionTitle}>Consultation Notes</Text>
        <FlatList
          data={consultationNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecordCard item={item} actionLabel="Download" />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
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
