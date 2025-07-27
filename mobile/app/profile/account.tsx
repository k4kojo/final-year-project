import DataCard from "@/components/data-card.component";
import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { getCurrentUserProfile } from "@/firebase/authService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type UserProfile = {
  nationalId: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  city: string;
  province: string;
  address: string;
};

export default function AccountInformationScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const { theme } = useThemeContext();
  const themeColors = Colors[theme];

  useEffect(() => {
    const fetchProfile = async () => {
      const userData = await getCurrentUserProfile();

      if (userData) {
        setProfile({
          nationalId: userData.nationalId ?? "—",
          username: userData.username ?? "—",
          firstName: userData.firstName ?? "—",
          lastName: userData.lastName ?? "—",
          dateOfBirth: userData.dateOfBirth ?? "—",
          gender: userData.gender ?? "—",
          phoneNumber: userData.phoneNumber ?? "—",
          email: userData.email ?? "—",
          city: userData.city ?? "—",
          province: userData.province ?? "—",
          address: userData.address ?? "—",
        });
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/tabs/profile")}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Information</Text>
        <TouchableOpacity onPress={() => router.push("/profile/edit-account")}>
          <Ionicons name="create-outline" size={22} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      {/* Personal Info */}
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Personal
      </Text>
      <DataCard
        data={[
          { label: "National ID", value: profile.nationalId },
          { label: "Username", value: profile.username },
          { label: "First Name", value: profile.firstName },
          { label: "Last Name", value: profile.lastName },
          { label: "Date of Birth", value: profile.dateOfBirth },
          { label: "Gender", value: profile.gender },
        ]}
      />

      {/* Contact Info */}
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Contact
      </Text>
      <DataCard
        data={[
          { label: "Phone Number", value: profile.phoneNumber },
          { label: "Email", value: profile.email },
          { label: "City", value: profile.city },
          { label: "Province", value: profile.province },
          { label: "Address", value: profile.address, fullWidth: true },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280", // Tailwind Gray-500
    marginBottom: 10,
  },
});
