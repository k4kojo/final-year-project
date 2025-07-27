import StepHeader from "@/components/step-header-component";
import Colors from "@/constants/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// New Doctor List (replace the old one)
export const doctors = [
  {
    initials: "DKA",
    name: "Dr. Kwame Asante",
    specialty: "General Practice",
    clinic: "Accra Medical Center",
    rating: 4.8,
    reviews: 124,
    fee: 150,
    photo: "", // add URI later
  },
  {
    initials: "DAO",
    name: "Dr. Ama Osei",
    specialty: "Cardiology",
    clinic: "Heart Care Clinic",
    rating: 4.9,
    reviews: 89,
    fee: 200,
    photo: "",
  },
  {
    initials: "DSA",
    name: "Dr. Samuel Amoako",
    specialty: "Cardiology",
    clinic: "Inkoom Hospital",
    rating: 4.9,
    reviews: 89,
    fee: 200,
    photo: "../../assets/images/doctor1.jpg",
    videoConsultation: true,
  },
  {
    initials: "DHA",
    name: "Dr. Henry Adgozo",
    specialty: "Genral Physician",
    clinic: "Korle-bu",
    rating: 4.9,
    reviews: 89,
    fee: 200,
    photo: "",
  },
  {
    initials: "DSA",
    name: "Dr. Sharon Antwi",
    specialty: "Gynecology",
    clinic: "Tema General Hospital",
    rating: 4.9,
    reviews: 89,
    fee: 200,
    photo: "",
  },
];

const ScheduleAppointment = () => {
  const { theme } = useThemeContext();
  const themeColors = Colors[theme];

  const [searchQuery, setSearchQuery] = useState("");
  useState<DocumentPicker.DocumentPickerResult | null>(null);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/tabs/appointment")}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Book Appointment
        </Text>
      </View>

      {/* Step Header */}
      <StepHeader step={1} />

      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Choose a Doctor
      </Text>

      {/* Search + Filter */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search doctors..."
          style={[
            styles.searchInput,
            { color: themeColors.text, borderColor: themeColors.border },
          ]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            // Optional: Toggle specialty filter dropdown here
          }}
        >
          <Ionicons name="filter-outline" size={20} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View
            style={[styles.doctorCard, { backgroundColor: themeColors.card }]}
          >
            <View style={styles.doctorCardLeft}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.avatarPlaceholder} />
                  <View>
                    <Text
                      style={[styles.doctorName, { color: themeColors.text }]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[styles.subText, { color: themeColors.subText }]}
                    >
                      {item.specialty}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <Ionicons name="star" color="orange" size={14} />
                      <Text
                        style={[
                          styles.ratingText,
                          { color: themeColors.subText },
                        ]}
                      >
                        {item.rating} ({item.reviews} reviews)
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 2 }}>
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color={themeColors.text}
                      />
                      <Text
                        style={[styles.subText, { color: themeColors.subText }]}
                      >
                        {item.clinic}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.consultationTypes}>
                  <Text
                    style={[
                      styles.consultationType,
                      { color: themeColors.text },
                    ]}
                  >
                    Video
                  </Text>
                  <Text
                    style={[
                      styles.consultationType,
                      { color: themeColors.text },
                    ]}
                  >
                    In-Person
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.priceColumn}>
              <Text style={[styles.priceText, { color: "green" }]}>
                ₵{item.fee}
              </Text>
              <Text style={[styles.subText, { color: themeColors.subText }]}>
                Consultation Fee
              </Text>
              <TouchableOpacity
                style={styles.selectBtn}
                onPress={() => {
                  // setSelectedDoctor(item);
                  // setSelectedSpecialty(item.specialty);
                  router.push({
                    pathname: "/appointment/select-time",
                    params: {
                      name: item.name,
                      specialty: item.specialty,
                      clinic: item.clinic,
                      fee: item.fee.toString(),
                      rating: item.rating.toString(),
                      reviews: item.reviews.toString(),
                    },
                  });
                }}
              >
                <Text style={styles.selectBtnText}>Select Doctor</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
  },
  doctorCard: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  doctorCardLeft: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 13,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 13,
    marginLeft: 6,
  },
  consultationTypes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  consultationType: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#333",
  },
  priceColumn: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  selectBtn: {
    backgroundColor: Colors.brand.primary,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectBtnText: {
    color: "#fff",
    fontSize: 13,
  },
});

export default ScheduleAppointment;
