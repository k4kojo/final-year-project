import StepHeader from "@/components/step-header-component";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const times = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"];

export default function SelectTimeScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [consultationType, setConsultationType] = useState("Video");
  const [selectedTime, setSelectedTime] = useState("");

  const { initials, name, specialty } = useLocalSearchParams();

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      alert("Select date and time before continuing");
      return;
    }

    // You can pass all values to the next screen if needed
    router.push({
      pathname: "/appointment/confirm",
      params: {
        name,
        specialty,
        initials,
        date: selectedDate,
        time: selectedTime,
        consultationType,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StepHeader step={2} />

      {/* Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      {/* Doctor Info */}
      <View style={styles.doctorCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials?.toString() ?? "Dr"}</Text>
        </View>
        <View>
          <Text style={styles.doctorName}>{name ?? "Doctor Name"}</Text>
          <Text style={styles.specialty}>{specialty ?? "Specialty"}</Text>
        </View>
      </View>

      {/* Date */}
      <Text style={styles.sectionTitle}>Select Date</Text>
      <View style={styles.box}>
        <Calendar
          minDate={new Date().toISOString().split("T")[0]}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: Colors.primary,
              selectedTextColor: "white",
            },
          }}
          theme={{
            selectedDayBackgroundColor: Colors.primary,
            todayTextColor: Colors.primary,
          }}
        />
      </View>

      {/* Appointment Type */}
      <Text style={styles.sectionTitle}>Appointment Type</Text>
      <View style={styles.boxRow}>
        {["Video", "In-Person"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setConsultationType(type)}
            style={[
              styles.consultTypeBtn,
              consultationType === type && styles.consultTypeBtnActive,
            ]}
          >
            <Ionicons
              name={type === "Video" ? "videocam-outline" : "person-outline"}
              color={consultationType === type ? "#fff" : "#333"}
              size={18}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.consultTypeText,
                consultationType === type && styles.consultTypeTextActive,
              ]}
            >
              {type === "Video" ? "Video Call" : "In-Person"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slots */}
      <Text style={styles.sectionTitle}>Available Times</Text>
      <View style={styles.timeGrid}>
        {times.map((time) => (
          <TouchableOpacity
            key={time}
            onPress={() => setSelectedTime(time)}
            style={[
              styles.timeBtn,
              selectedTime === time && styles.timeBtnActive,
            ]}
          >
            <Ionicons
              name="time-outline"
              size={16}
              color={selectedTime === time ? "#fff" : "#333"}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.timeText,
                selectedTime === time && styles.timeTextActive,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  doctorCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 46,
    height: 46,
    backgroundColor: "#ddd",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  specialty: {
    color: "#666",
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    marginBottom: 20,
  },
  boxRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  consultTypeBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  consultTypeBtnActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  consultTypeText: {
    fontSize: 14,
    color: "#333",
  },
  consultTypeTextActive: {
    color: "#fff",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 30,
  },
  timeBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timeBtnActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  timeText: {
    fontSize: 14,
    color: "#333",
  },
  timeTextActive: {
    color: "#fff",
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 50,
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
