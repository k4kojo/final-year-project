import SettingItem from "@/components/settings-item";
import Colors from "@/constants/colors";
import { getCurrentUserProfile } from "@/firebase/authService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userData = await getCurrentUserProfile();
      if (userData) {
        setProfile({
          firstName: userData.firstName ?? "",
          lastName: userData.lastName ?? "",
          email: userData.email ?? "",
        });
      }
    };
    fetchProfile();
  }, []);

  // const handleLogout = async () => {
  //   const res = await signOutUser();
  //   if (res.success) {
  //     router.replace("/sign-in");
  //   } else {
  //     Alert.alert("Logout Failed", res.error);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/75.jpg",
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {profile?.firstName} {profile?.lastName}
          </Text>
          <Text style={styles.email}>{profile?.email || "Loading..."}</Text>
        </View>
      </View>

      {/* Section */}
      <Text style={styles.sectionTitle}>General</Text>
      <View style={styles.section}>
        <SettingItem
          icon="person"
          label="Account Information"
          caption="Change your account information"
          color={Colors.primary}
          onPress={() => router.push("/profile/account")}
        />
        <SettingItem
          icon="card"
          label="Insurance Detail"
          caption="Add your insurance info"
          color="#228B22"
          onPress={() => router.push("/profile/insurance")}
        />
        <SettingItem
          icon="medkit"
          label="Medical Records"
          caption="History about your medical records"
          color="#FEBE10"
          onPress={() => router.push("/profile/medical-record")}
        />
        <SettingItem
          icon="information-circle"
          label="Hospital Info"
          caption="Information about our Clinic"
          color="#720e9e"
          onPress={() => router.push("/profile/hospital")}
        />
        <SettingItem
          icon="settings"
          label="Settings"
          caption="Manage & Settings"
          color="#191970"
          onPress={() => router.push("/profile/settings")}
        />
        {/* <SettingItem
          icon="log-out-outline"
          label="Log Out"
          caption=""
          onPress={handleLogout}
          color="#e11d48"
        /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
  },
  profileCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: "#2563eb",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },
  userInfo: {
    height: 40,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#f3f4f6",
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  section: {
    marginHorizontal: 10,
    paddingBottom: 20,
  },
});
