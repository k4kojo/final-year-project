import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const { theme } = useThemeContext();
  const themeColors = Colors[theme];
  const brand = Colors.brand;

  const handleLogout = async () => {
    setLoggingOut(true);
    const res = await signOutUser();
    setLoggingOut(false);
    if (res.success) {
      router.replace("/sign-in");
    } else {
      Alert.alert("Logout Failed", res.error);
    }
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
    <TouchableOpacity
      style={[styles.row, { borderColor: themeColors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.rowLabel, { color: themeColors.text }]}>
        {label}
      </Text>
      {rightIcon ?? (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={themeColors.subText}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/tabs/profile")}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* General */}
      <Text style={[styles.sectionTitle, { color: themeColors.subText }]}>
        General
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
        <View style={[styles.row, { borderColor: themeColors.border }]}>
          <Text style={[styles.rowLabel, { color: themeColors.text }]}>
            Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: themeColors.border, true: brand.primary }}
            thumbColor={"#fff"}
          />
        </View>

        <Item label="Contact Us" onPress={() => router.push("/contact")} />
      </View>

      {/* About */}
      <Text style={[styles.sectionTitle, { color: themeColors.subText }]}>
        About
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
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowLabel: {
    fontSize: 15,
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
