import Button from "@/components/button.component";
import DatePickerField from "@/components/inputs/datePickerField.component";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const doctors = [
  { name: "Dr. Ama Mensah", specialty: "Cardiology" },
  { name: "Dr. Kofi Asante", specialty: "Dermatology" },
  { name: "Dr. Linda Owusu", specialty: "Pediatrics" },
  { name: "Dr. Nana Yeboah", specialty: "General Practice" },
  { name: "Dr. Afia Serwaa", specialty: "Cardiology" },
];

const ScheduleAppointment = () => {
  type Doctor = { name: string; specialty: string };
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isDoctorModalVisible, setDoctorModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState("Video");
  const [reason, setReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFile, setUploadFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);

  const times = ["09:00AM", "10:00AM", "11:00AM", "01:00PM"];

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorSelect = (doctor: { name: string; specialty: string }) => {
    setSelectedDoctor(doctor);
    setSelectedSpecialty(doctor.specialty);
    setDoctorModalVisible(false);
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.type === "success") {
        setUploadFile(result); // OK here
      } else {
        setUploadFile(null); // Optional: clear previous upload if canceled
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Appointment</Text>
      </View>

      {/* Doctor Picker */}
      <Text style={styles.label}>Doctor</Text>
      <TouchableOpacity
        style={styles.pickerBox}
        onPress={() => setDoctorModalVisible(true)}
      >
        <Text>{selectedDoctor?.name || "Select doctor"}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={isDoctorModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {/* Close Icon */}
          <TouchableOpacity
            onPress={() => setDoctorModalVisible(false)}
            style={[styles.closeIcon, { left: 20, right: "auto" }]}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>

          {/* Search Bar */}
          <TextInput
            placeholder="Search doctor or specialty"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />

          {/* Doctor List */}
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filteredDoctors}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleDoctorSelect(item)}
                style={styles.doctorItem}
              >
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Specialty (auto-filled) */}
      <Text style={styles.label}>Specialty</Text>
      <View style={styles.pickerBox}>
        <Text>{selectedSpecialty || ""}</Text>
      </View>

      {/* Date */}
      <Text style={styles.label}>Date</Text>
      <DatePickerField
        show={showDatePicker}
        date={date}
        onToggle={() => setShowDatePicker(!showDatePicker)}
        onChange={(event, selected) => {
          if (selected) setDate(selected);
        }}
        onConfirm={() => setShowDatePicker(false)}
        displayDate={format(date, "EEEE, MMMM d, yyyy")}
        placeholder="Select appointment date"
        inputStyles={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 10,
          fontSize: 15,
          color: "#333",
        }}
      />

      {/* Time */}
      <Text style={styles.label}>Time</Text>
      <View style={styles.timeRow}>
        {times.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTime,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Consultation Type */}
      <Text style={styles.label}>Consultation Type</Text>
      <View style={styles.radioRow}>
        {["Video", "In-Person"].map((type) => (
          <TouchableOpacity
            key={type}
            style={styles.radioOption}
            onPress={() => setConsultationType(type)}
          >
            <Ionicons
              name={
                consultationType === type
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.radioLabel}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reason */}
      <Text style={styles.label}>Reason for Visit</Text>
      <TextInput
        placeholder="Enter a reason"
        style={styles.input}
        value={reason}
        onChangeText={setReason}
      />

      {/* Upload Button */}
      <Text style={styles.label}>Medical Documents</Text>
      <View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleFileUpload}
        >
          <Ionicons name="cloud-upload-outline" size={18} />
          <Text style={{ marginLeft: 5 }}>Upload</Text>
        </TouchableOpacity>
        {uploadedFile && (
          <Text style={{ marginTop: 10, fontStyle: "italic" }}>
            {uploadedFile.name} Remove
          </Text>
        )}
      </View>

      {/* Submit */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Schedule appointment"
          onPress={() => console.log("Scheduling...")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },
  label: {
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  selectedTime: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  radioRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  radioLabel: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    zIndex: 1,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 60,
  },
  doctorItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  doctorName: {
    fontWeight: "600",
    fontSize: 16,
  },
  specialty: {
    color: "gray",
    fontSize: 13,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 120,
  },
});

export default ScheduleAppointment;
