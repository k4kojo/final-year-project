import Colors from "@/constants/colors";
import { signOutUser } from "@/firebase/authService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    setTimeout(async () => {
      const res = await signOutUser();
      setLoggingOut(false);
      if (res.success) {
        router.replace("/sign-in");
      } else {
        Alert.alert("Logout Failed", res.error);
      }
    }, 3000);
  };

  const Item = ({
    label,
    onPress,
    rightIcon,
  }: {
    label: string;
    onPress?: () => void;
    rightIcon?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.rowLabel}>{label}</Text>
      {rightIcon ?? <Ionicons name="chevron-forward" size={16} color="#ccc" />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* General */}
      <Text style={styles.sectionTitle}>General</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#ccc", true: Colors.primary }}
            thumbColor="#fff"
          />
        </View>

        <Item label="Contact Us" onPress={() => router.push("/contact")} />
      </View>

      {/* About */}
      <Text style={styles.sectionTitle}>About</Text>

      <View style={styles.card}>
        <Item
          label="Privacy Policy"
          onPress={() => router.push("/legal/privacy")}
        />
        <Item label="About Us" onPress={() => router.push("/about")} />
        <Item label="FAQ" onPress={() => router.push("/help/faq")} />
        <Item label="Legal" onPress={() => router.push("/legal")} />
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logout}
        disabled={loggingOut}
      >
        <Text style={[styles.logoutText, loggingOut && { opacity: 0.5 }]}>
          {loggingOut ? "Logging out..." : "Logout"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "transparent",
    paddingHorizontal: 8,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowLabel: {
    fontSize: 15,
    color: "#111827",
  },
  logout: {
    paddingVertical: 20,
    marginTop: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#e11d48",
    fontWeight: "600",
    fontSize: 15,
  },
});
