import TopHeader from "@/components/top-header.component";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Consultation = () => {
  const upcomingConsultation = {
    doctor: "Dr. Derick Agyeman",
    specialty: "General Physician",
    date: "16 June, 2025",
    time: "11:00AM",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  };

  const consultationHistory = [
    {
      id: "1",
      doctor: "Dr. Kwame Appiah",
      date: "May 20, 2024",
    },
    {
      id: "2",
      doctor: "Dr. Aisha Owusu",
      date: "May 20, 2024",
    },
    {
      id: "3",
      doctor: "Dr. Clemet Adjei",
      date: "May 20, 2024",
    },
  ];
  return (
    <View style={styles.container}>
      <TopHeader screen="consult" />

      <View style={styles.content}>
        {/* Upcoming Consultation */}
        <Text style={styles.sectionTitle}>Upcoming Consultations</Text>
        <View style={styles.card}>
          <View style={styles.doctorRow}>
            <Image
              source={{ uri: upcomingConsultation.image }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.doctorName}>
                {upcomingConsultation.doctor}
              </Text>
              <Text style={styles.specialty}>
                {upcomingConsultation.specialty}
              </Text>
            </View>
          </View>
          <Text style={styles.datetime}>
            {upcomingConsultation.date} | {upcomingConsultation.time}
          </Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Consultation</Text>
          </TouchableOpacity>
        </View>

        {/* Consultation History */}
        <Text style={styles.sectionTitle}>Consultation History</Text>
        <FlatList
          data={consultationHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <View>
                <Text style={styles.historyDoctor}>{item.doctor}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewSummary}>View summary</Text>
              </TouchableOpacity>
            </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    backgroundColor: "#fff",
  },
  doctorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  doctorName: {
    fontWeight: "600",
    fontSize: 15,
  },
  specialty: {
    fontStyle: "italic",
    color: "#666",
  },
  datetime: {
    marginTop: 5,
    marginBottom: 15,
    color: "#444",
  },
  joinButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  historyItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyDoctor: {
    fontWeight: "600",
    marginBottom: 3,
  },
  historyDate: {
    color: "#555",
    fontSize: 13,
  },
  viewSummary: {
    color: "#2563eb",
    fontWeight: "500",
  },
});

export default Consultation;
