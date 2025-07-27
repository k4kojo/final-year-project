import TopHeader from "@/components/top-header.component";
import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
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

  const { theme } = useThemeContext();
  const themeColors = Colors[theme];
  const brandColors = Colors.brand;

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <TopHeader screen="consult" />

      <View
        style={[styles.content, { backgroundColor: themeColors.background }]}
      >
        {/* Upcoming Consultation */}
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Upcoming Consultations
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <View style={styles.doctorRow}>
            <Image
              source={{ uri: upcomingConsultation.image }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.doctorName, { color: themeColors.text }]}>
                {upcomingConsultation.doctor}
              </Text>
              <Text style={[styles.specialty, { color: themeColors.subText }]}>
                {upcomingConsultation.specialty}
              </Text>
            </View>
          </View>

          <Text style={[styles.datetime, { color: themeColors.subText }]}>
            {upcomingConsultation.date} | {upcomingConsultation.time}
          </Text>
          <TouchableOpacity
            style={[
              styles.joinButton,
              { backgroundColor: brandColors.primary },
            ]}
          >
            <Text style={styles.joinButtonText}>Join Consultation</Text>
          </TouchableOpacity>
        </View>

        {/* Consultation History */}
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Consultation History
        </Text>
        <FlatList
          data={consultationHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.historyItem,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <View>
                <Text
                  style={[styles.historyDoctor, { color: themeColors.text }]}
                >
                  {item.doctor}
                </Text>
                <Text
                  style={[styles.historyDate, { color: themeColors.subText }]}
                >
                  {item.date}
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={[styles.viewSummary, { color: brandColors.primary }]}
                >
                  View summary
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Consultation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
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
  },
  datetime: {
    marginTop: 5,
    marginBottom: 15,
  },
  joinButton: {
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
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyDoctor: {
    fontWeight: "600",
    marginBottom: 3,
  },
  historyDate: {
    fontSize: 13,
  },
  viewSummary: {
    fontWeight: "500",
  },
});
