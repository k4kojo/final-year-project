import DataCard from "@/components/data-card.component";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountInformationScreen() {
  const navigation = useNavigation();

  // Dummy profile data (replace with context/Firebase later)
  const profile = {
    ecareId: "1092302",
    username: "zhafira",
    firstName: "Zhafira",
    lastName: "Azalea",
    dob: "Feb 12, 1994",
    gender: "Female",
    phone: "081892319321",
    email: "zhafira@gmail.com",
    city: "Bandung",
    province: "West Java",
    address: "Jl. Sekar Wangi 20 A, Bancangan",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Information</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Personal Info */}
      <Text style={styles.sectionTitle}>Personal</Text>
      <DataCard
        data={[
          { label: "Ecare ID", value: profile.ecareId },
          { label: "Username", value: profile.username },
          { label: "First Name", value: profile.firstName },
          { label: "Last Name", value: profile.lastName },
          { label: "Date of Birth", value: profile.dob },
          { label: "Gender", value: profile.gender },
        ]}
      />

      {/* Contact Info */}
      <Text style={styles.sectionTitle}>Contact</Text>
      <DataCard
        data={[
          { label: "Phone Number", value: profile.phone },
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
