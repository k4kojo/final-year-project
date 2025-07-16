import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Success icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.checkCircle}>
          <Feather name="check" size={50} color="#fff" />
        </View>
      </View>

      {/* Title and message */}
      <Text style={styles.title}>Successfull</Text>
      <Text style={styles.subtitle}>Your appointment has been requested</Text>

      {/* Info box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          If you have any problem or any issue{"\n"}
          and you need to change your visit,{"\n"}
          please call <Text style={styles.bold}>021 9012301</Text>
        </Text>
      </View>

      {/* Google Calendar Button */}
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={() =>
          Alert.alert("Google Calendar", "Will launch integration")
        }
      >
        <Image
          source={{
            uri: "https://www.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_20_2x.png",
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleBtnText}>Add Google Calendar</Text>
      </TouchableOpacity>

      {/* Back to home */}
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => router.replace("/tabs")}
      >
        <Text style={styles.homeBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  iconWrapper: {
    marginBottom: 30,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#22c55e", // Tailwind green-500
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280", // Tailwind gray-500
    textAlign: "center",
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: "#fef3c7", // Tailwind amber-100
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    borderColor: "#fcd34d", // amber-300
    borderWidth: 1,
  },
  infoText: {
    color: "#6b7280",
    textAlign: "center",
    fontSize: 14,
  },
  bold: {
    fontWeight: "bold",
    color: "#111827",
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: "100%",
    marginBottom: 16,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleBtnText: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  homeBtn: {
    backgroundColor: "#2563EB", // Tailwind blue-600
    paddingVertical: 16,
    borderRadius: 10,
    width: "100%",
  },
  homeBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
